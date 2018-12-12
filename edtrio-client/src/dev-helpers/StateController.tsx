import React, { PureComponent } from "react";
import styled from "styled-components";

import { IUserType } from "../types";

const StyledEditButton = styled.button`
  float: right;
  padding: 8px;
`;

const StyledStateController = styled.div`
  margin-bottom: 20px;
`;

const StyledUserButton = styled.button`
  padding: 8px;
  margin: 0 8px;
`;

const StyledLoggedInUser = styled.span`
  margin-right: 8px;
`;

interface IStateControllerProps {
  isEditable: boolean;
  updateIsEditable: (isEditable: boolean) => void;
  updateCurrentUser: (user: any) => void;
  users: IUserType[];
  currentUser: IUserType;
}

export class StateController extends PureComponent<IStateControllerProps> {
  public render() {
    const {
      users,
      updateCurrentUser,
      currentUser,
      isEditable,
      updateIsEditable,
    } = this.props;
    return (
      <StyledStateController>
        <StyledLoggedInUser>
          Currently logged in : <strong>{currentUser.name}</strong>
        </StyledLoggedInUser>
        Change your current user:
        {users.map((user, index) => (
          <StyledUserButton onClick={() => updateCurrentUser(user)} key={index}>
            {user.name}
          </StyledUserButton>
        ))}
        {currentUser.isTeacher && (
          <StyledEditButton onClick={() => updateIsEditable(!isEditable)}>
            {isEditable ? "Preview" : "Editieren"}
          </StyledEditButton>
        )}
      </StyledStateController>
    );
  }
}

const teacherUser: IUserType = {
  name: "Egon Editor",
  isTeacher: true,
};

const pupilUser: IUserType = {
  name: "Peter Pupil",
  isTeacher: false,
};

const allUsers: IUserType[] = [teacherUser, pupilUser];

export const testUsers = { users: allUsers, currentUser: teacherUser };
