import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { Editor, Node } from "slate";

import styled from "styled-components";
import { EditorStateContext } from "../../context/EditorStateContext";
import { apolloClient } from "../../EditorWrapper/apolloClient";
import {
  createMultipleChoiceAnswer,
  createMultipleChoiceAnswerVariables,
} from "../../graphqlOperations/generated-types/createMultipleChoiceAnswer";
import {
  createMultipleChoiceSubmission,
  createMultipleChoiceSubmissionVariables,
} from "../../graphqlOperations/generated-types/createMultipleChoiceSubmission";

import {
  CREATE_MULTIPLE_CHOICE_ANSWER,
  CREATE_MULTIPLE_CHOICE_SUBMISSION,
  DELETE_MULTIPLE_CHOICE_ANSWER,
  MULTIPLE_CHOICE_ANSWER,
  MULTIPLE_CHOICE_SUBMISSION,
  UPDATE_MULTIPLE_CHOICE_ANSWER,
  UPDATE_MULTIPLE_CHOICE_SUBMISSION,
} from "../../graphqlOperations/operations";

const StyledCheckboxWrapper = styled.span`
  margin-right: 8px;
`;

interface IMultipleChoiceAnswerNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
  readOnly: boolean;
}

export class MultipleChoiceAnswerNode extends PureComponent<
  IMultipleChoiceAnswerNodeProps
> {
  public id: string;
  constructor(props: IMultipleChoiceAnswerNodeProps) {
    super(props);

    this.id = "";
  }

  public async testValidity(props: IMultipleChoiceAnswerNodeProps) {
    // Test for having no id
    // @ts-ignore
    const id = props.node.data.get("id");

    // Test for a copied node
    // @ts-ignore
    const collisionNode = props.editor.value.document.findDescendant(
      (descendant: Node) =>
        "data" in descendant &&
        // @ts-ignore
        descendant.data.get("id") === props.node.data.get("id") &&
        descendant.key !== props.node.key,
    );
    if (
      collisionNode ||
      !id ||
      (Object.keys(id).length === 0 && id.constructor === Object)
    ) {
      // node needs to be created on backend-side
      const answer = await apolloClient.mutate<
        createMultipleChoiceAnswer,
        createMultipleChoiceAnswerVariables
      >({
        mutation: CREATE_MULTIPLE_CHOICE_ANSWER,
        variables: { isCorrect: false },
      });
      if (answer && answer.data && answer.data.createMultipleChoiceAnswer) {
        props.editor.setNodeByKey(props.node.key, {
          data: { id: answer.data.createMultipleChoiceAnswer.id },
          type: "multiple-choice-answer",
        });
      }
    } else {
      // ??
    }
  }
  public componentDidMount() {
    setTimeout(() => this.testValidity(this.props), 200);
  }

  public changeAnswerCorrectness(event: any, id: string) {
    apolloClient.mutate({
      mutation: UPDATE_MULTIPLE_CHOICE_ANSWER,
      variables: { answerId: id, isCorrect: event.target.checked },
    });
  }

  public async submitAnswer(
    event: any,
    id: string,
    userId: string,
    multipleChoiceSubmission?: any,
  ) {
    // TODO: do this in componentDidMount: Create a submission so it always has to just be updated
    if (multipleChoiceSubmission || this.id) {
      const submissionId = multipleChoiceSubmission
        ? multipleChoiceSubmission.id
        : this.id;
      apolloClient.mutate({
        mutation: UPDATE_MULTIPLE_CHOICE_SUBMISSION,
        variables: {
          submissionId,
          isChecked: event.target.checked,
        },
      });
    } else {
      const answer = await apolloClient.mutate<
        createMultipleChoiceSubmission,
        createMultipleChoiceSubmissionVariables
      >({
        mutation: CREATE_MULTIPLE_CHOICE_SUBMISSION,
        variables: { answerId: id, isChecked: event.target.checked, userId },
      });
      if (answer.data && answer.data.createMultipleChoiceSubmission) {
        this.id = answer.data.createMultipleChoiceSubmission.id;
      }
    }
  }

  public render() {
    const { node, attributes, children, readOnly } = this.props;
    // @ts-ignore only invoked on section type blocks
    const id = node.data.get("id");
    if (readOnly) {
      return (
        <div {...attributes}>
          <StyledCheckboxWrapper contentEditable={false}>
            <EditorStateContext.Consumer>
              {({ currentUser }) => {
                return currentUser ? (
                  <Query
                    query={MULTIPLE_CHOICE_SUBMISSION}
                    variables={{ answerId: id, userId: currentUser.id }}
                  >
                    {({ loading, error, data }) => {
                      if (loading) {
                        return <p>Loading</p>;
                      }
                      if (error) {
                        return <p>Error fetching data</p>;
                      }
                      if (data && data.submissionByUser) {
                        return (
                          <input
                            type="checkbox"
                            checked={data.submissionByUser.isChecked}
                            onChange={event =>
                              this.submitAnswer(
                                event,
                                id,
                                currentUser.id,
                                data.submissionByUser,
                              )
                            }
                          />
                        );
                      } else {
                        return (
                          <input
                            type="checkbox"
                            onChange={event =>
                              this.submitAnswer(event, id, currentUser.id)
                            }
                          />
                        );
                      }
                    }}
                  </Query>
                ) : null;
              }}
            </EditorStateContext.Consumer>
          </StyledCheckboxWrapper>
          {children}
        </div>
      );
    }
    return (
      <div {...attributes}>
        <StyledCheckboxWrapper contentEditable={false}>
          {!id ||
          (Object.keys(id).length === 0 && id.constructor === Object) ? (
            <p>Loading</p>
          ) : (
            // Query
            <Query query={MULTIPLE_CHOICE_ANSWER} variables={{ answerId: id }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <p>Loading</p>;
                }
                if (error) {
                  return <p>Error fetching data</p>;
                }
                if (data && data.multipleChoiceAnswer) {
                  return (
                    <input
                      type="checkbox"
                      checked={data.multipleChoiceAnswer.isCorrect}
                      onChange={event =>
                        this.changeAnswerCorrectness(event, id)
                      }
                    />
                  );
                }
                return <input type="checkbox" checked={false} />;
              }}
            </Query>
          )}
        </StyledCheckboxWrapper>
        {children}
      </div>
    );
  }

  public componentWillUnmount() {
    // @ts-ignore
    if (
      // @ts-ignore: this exists
      !this.props.editor.value.document.findDescendant(
        // @ts-ignore
        (node: Node) =>
          "data" in node &&
          "data" in this.props.node &&
          node.data.get("id") === this.props.node.data.get("id"),
      )
    ) {
      // node has been deleted :O
      apolloClient.mutate({
        mutation: DELETE_MULTIPLE_CHOICE_ANSWER,
        // @ts-ignore
        variables: { answerId: this.props.node.data.get("id") },
      });
    }
  }
}
