import React, { PureComponent } from "react";

import styled from "styled-components";
import { apolloClient } from "../../../EditorWrapper/apolloClient";

import {
  createMultipleChoiceSubmission,
  createMultipleChoiceSubmission_createMultipleChoiceSubmission,
  createMultipleChoiceSubmissionVariables,
} from "../../../graphqlOperations/generated-types/createMultipleChoiceSubmission";

import {
  submissionByUser,
  submissionByUser_submissionByUser,
  submissionByUserVariables,
} from "../../../graphqlOperations/generated-types/submissionByUser";

import {
  CREATE_MULTIPLE_CHOICE_SUBMISSION,
  MULTIPLE_CHOICE_SUBMISSION,
  UPDATE_MULTIPLE_CHOICE_SUBMISSION,
} from "../../../graphqlOperations/operations";

import { IUserType } from "../../../types";
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

interface IMultipleChoiceAnswerPupilNodeProps
  extends IMultipleChoiceAnswerNodeProps {
  currentUser: IUserType;
}

interface IMultipleChoiceAnswerPupilNodeState {
  submission:
    | submissionByUser_submissionByUser
    | createMultipleChoiceSubmission_createMultipleChoiceSubmission
    | null;
}

export class MultipleChoiceAnswerPupilNode extends PureComponent<
  IMultipleChoiceAnswerPupilNodeProps,
  IMultipleChoiceAnswerPupilNodeState
> {
  constructor(props: IMultipleChoiceAnswerPupilNodeProps) {
    super(props);
    this.state = { submission: null };
  }

  public async componentDidMount() {
    const answerId = this.props.node.data.get("id");
    const { currentUser } = this.props;

    // query submission
    const submissionResponse = await apolloClient.query<
      submissionByUser,
      submissionByUserVariables
    >({
      query: MULTIPLE_CHOICE_SUBMISSION,
      variables: { answerId, userId: currentUser.id },
    });

    if (submissionResponse.data.submissionByUser) {
      this.setState({ submission: submissionResponse.data.submissionByUser });
    } else {
      // no submission found? create a new one
      const creationResponse = await apolloClient.mutate<
        createMultipleChoiceSubmission,
        createMultipleChoiceSubmissionVariables
      >({
        mutation: CREATE_MULTIPLE_CHOICE_SUBMISSION,
        variables: { answerId, isChecked: false, userId: currentUser.id },
      });

      if (
        creationResponse.data &&
        creationResponse.data.createMultipleChoiceSubmission
      ) {
        this.setState({
          submission: creationResponse.data.createMultipleChoiceSubmission,
        });
      }
    }
  }

  public async submitAnswer(event: any) {
    const submission = this.state.submission;
    if (submission) {
      apolloClient.mutate({
        mutation: UPDATE_MULTIPLE_CHOICE_SUBMISSION,
        variables: {
          submissionId: submission.id,
          isChecked: event.target.checked,
        },
      });
    }
  }

  public render() {
    const { attributes, children } = this.props;

    const submission = this.state.submission;
    return (
      <StyledAnswerWrapper {...attributes}>
        <StyledCheckboxWrapper contentEditable={false}>
          {submission ? (
            <input
              type="checkbox"
              defaultChecked={submission.isChecked}
              onInput={event => this.submitAnswer(event)}
            />
          ) : (
            <input type="checkbox" disabled={true} />
          )}
        </StyledCheckboxWrapper>
        {children}
      </StyledAnswerWrapper>
    );
  }
}
