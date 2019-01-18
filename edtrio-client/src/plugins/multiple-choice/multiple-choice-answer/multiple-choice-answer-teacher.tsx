import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import styled from "styled-components";
import { apolloClient } from "../../../EditorWrapper/apolloClient";

import {
  MULTIPLE_CHOICE_ANSWER,
  UPDATE_MULTIPLE_CHOICE_ANSWER,
} from "../../../graphqlOperations/operations";

import { checkAndDeleteNode, testAnswerNodeValidity } from "./helpers/validity";
import { IMultipleChoiceAnswerNodeProps } from "./index";

const StyledCheckboxWrapper = styled.span`
  margin-right: 8px;
`;

const StyledAnswerWrapper = styled.div`
  min-width: 40%;
  margin: 6px;
  margin-left: 18px;
  display: flex;
  align-items: center;
`;

export class MultipleChoiceAnswerTeacherNode extends PureComponent<
  IMultipleChoiceAnswerNodeProps
> {
  public componentDidMount() {
    // check for correct node creation
    setTimeout(
      () => testAnswerNodeValidity(this.props.editor, this.props.node),
      200,
    );
  }

  public changeAnswerCorrectness(event: any, id: string) {
    apolloClient.mutate({
      mutation: UPDATE_MULTIPLE_CHOICE_ANSWER,
      variables: { answerId: id, isCorrect: event.target.checked },
    });
  }

  public render() {
    const { node, attributes, children } = this.props;
    const id = node.data.get("id");

    return (
      <StyledAnswerWrapper {...attributes}>
        <StyledCheckboxWrapper contentEditable={false}>
          {!id ||
          (Object.keys(id).length === 0 && id.constructor === Object) ? (
            <input type="checkbox" disabled={true} />
          ) : (
            // Query answer
            <Query query={MULTIPLE_CHOICE_ANSWER} variables={{ answerId: id }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <input type="checkbox" disabled={true} />;
                }
                if (error) {
                  return (
                    <p>
                      Fehler beim Abrufen der Antwort. Bitte die folgende
                      Antwort löschen und neu hinzufügen:
                    </p>
                  );
                }
                if (data && data.multipleChoiceAnswer) {
                  return (
                    <input
                      type="checkbox"
                      defaultChecked={data.multipleChoiceAnswer.isCorrect}
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
      </StyledAnswerWrapper>
    );
  }

  public componentWillUnmount() {
    checkAndDeleteNode(this.props.editor, this.props.node);
  }
}
