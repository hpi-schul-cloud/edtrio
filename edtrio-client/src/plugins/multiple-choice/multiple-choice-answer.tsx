import gql from "graphql-tag";
import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { Editor, Node } from "slate";

import styled from "styled-components";
import { EditorStateContext } from "../../context/EditorStateContext";
import { apolloClient } from "../../EditorWrapper/apolloClient";

const StyledCheckboxWrapper = styled.span`
  margin-right: 8px;
`;

const CREATE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation createMultipleChoiceAnswer($isCorrect: Boolean!) {
    createMultipleChoiceAnswer(isCorrect: $isCorrect) {
      id
    }
  }
`;

const UPDATE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation updateMultipleChoiceAnswer(
    $answerId: String!
    $isCorrect: Boolean!
  ) {
    updateMultipleChoiceAnswer(answerId: $answerId, isCorrect: $isCorrect) {
      id
      isCorrect
    }
  }
`;

const DELETE_MULTIPLE_CHOICE_ANSWER = gql`
  mutation deleteMultipleChoiceAnswer($answerId: String!) {
    deleteMultipleChoiceAnswer(answerId: $answerId) {
      id
    }
  }
`;

const MULTIPLE_CHOICE_ANSWER = gql`
  query multipleChoiceAnswer($answerId: String!) {
    multipleChoiceAnswer(answerId: $answerId) {
      id
      isCorrect
    }
  }
`;

const MULTIPLE_CHOICE_SUBMISSION = gql`
  query submissionByUser($answerId: String!, $userId: String!) {
    submissionByUser(answerId: $answerId, userId: $userId) {
      id
      isChecked
    }
  }
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
      const answer = await apolloClient.mutate({
        mutation: CREATE_MULTIPLE_CHOICE_ANSWER,
        variables: { isCorrect: false },
      });
      if (answer && answer.data && answer.data.createMultipleChoiceAnswer.id) {
        props.editor.setNodeByKey(props.node.key, {
          data: { id: answer.data.createMultipleChoiceAnswer.id },
          type: "multiple-choice-answer",
        });
      }
    } else {
      const answer = await apolloClient.query({
        query: MULTIPLE_CHOICE_ANSWER,
        variables: { answerId: id },
      });
      // @ts-ignore
      if (answer && answer.data && answer.data.multipleChoiceAnswer) {
        // @ts-ignore
        console.log(answer.data.multipleChoiceAnswer);
        // TODO: why this?
      }
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

  public submitAnswer(event: any, id: string, multipleChoiceSubmission?: any) {
    console.log(event.target.checked);
    console.log(multipleChoiceSubmission);
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
                return (
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
                      if (data && data.multipleChoiceSubmission) {
                        return (
                          <input
                            type="checkbox"
                            checked={data.multipleChoiceSubmission.isChecked}
                            onChange={event =>
                              this.submitAnswer(
                                event,
                                id,
                                data.multipleChoiceSubmission,
                              )
                            }
                          />
                        );
                      } else {
                        return (
                          <input
                            type="checkbox"
                            onChange={event => this.submitAnswer(event, id)}
                          />
                        );
                      }
                    }}
                  </Query>
                );
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
