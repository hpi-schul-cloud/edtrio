import React, { PureComponent } from "react";
import styled from "styled-components";

import { apolloClient } from "../EditorWrapper/apolloClient";

import {
  userByOpenHpiEmail,
  userByOpenHpiEmailVariables,
} from "../graphqlOperations/generated-types/userByOpenHpiEmail";

import { USER_BY_OPENHPIEMAIL } from "../graphqlOperations/operations";
import { IUserType } from "../types";
interface IUserBarrierProps {
  children: any;
  updateCurrentUser: (newUser: IUserType) => void;
  currentUser: IUserType | null;
  updateUserList: (users: IUserType[]) => void;
}

const StyledPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledPageContent = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  justify-content: center;
  margin-top: 30%;
  padding: 0 20%;
`;

const StyledAgainButton = styled.button`
  display: inline-block;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  padding: 24px;
  flex: 0;
  margin-top: 16px;
  color: #fff;
  background-color: #b10438;
  border-color: #b10438;
`;

export class UserBarrier extends PureComponent<IUserBarrierProps> {
  public async getUser() {
    const { updateCurrentUser, updateUserList } = this.props;

    const emailInput = prompt(
      "Bitte nenne uns deine E-Mail-Adresse, die du beim Login auf open.hpi.de verwendest:",
      "",
    );
    if (emailInput != null && emailInput !== "") {
      // Wert vorhanden
      const userResponse = await apolloClient.query<
        userByOpenHpiEmail,
        userByOpenHpiEmailVariables
      >({
        query: USER_BY_OPENHPIEMAIL,
        variables: { openHpiEmail: emailInput },
      });
      if (userResponse.data.userByOpenHpiEmail) {
        updateCurrentUser({
          id: userResponse.data.userByOpenHpiEmail.id,
          name: userResponse.data.userByOpenHpiEmail.name,
          isTeacher: userResponse.data.userByOpenHpiEmail.isTeacher,
        });
        updateUserList([
          {
            id: userResponse.data.userByOpenHpiEmail.id,
            name: userResponse.data.userByOpenHpiEmail.name,
            isTeacher: userResponse.data.userByOpenHpiEmail.isTeacher,
          },
        ]);
      }
    }
  }

  public render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return this.props.children;
    } else {
      return (
        <StyledPageWrapper>
          <StyledPageContent>
            Hallo!
            <br />
            Um deinen Fortschritt speichern zu können, brauchen wir deine
            E-Mail-Adresse, mit der du dich bei{" "}
            <a href="https://open.hpi.de" target="_blank">
              openHPI
            </a>{" "}
            registriert hast. Bitte gib sie hier im Folgenden ein.
            <div>
              <StyledAgainButton onClick={() => this.getUser()}>
                E-Mail-Adresse eingeben
              </StyledAgainButton>
            </div>
          </StyledPageContent>
        </StyledPageWrapper>
      );
    }
  }
}
