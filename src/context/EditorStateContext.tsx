import React, { Component, createContext } from "react";

import { IUserType } from "../types";

const seedUser = { name: "Test Test", teacher: false };

export const EditorStateContext = createContext<IEditorStateProviderState>({
  isEditable: true,
  updateIsEditable: (isEditable: boolean) => {},
  updateCurrentUser: (newUser: IUserType) => {},
  updateUserList: (users: IUserType[]) => {},
  currentUser: seedUser,
  users: [seedUser],
});

interface IEditorStateProviderProps {
  initialUserList: IUserType[];
  initialUser: IUserType;
}

interface IEditorStateProviderState {
  isEditable: boolean;
  updateIsEditable: (isEditable: boolean) => void;
  currentUser: IUserType;
  updateCurrentUser: (newUser: IUserType) => void;
  users: IUserType[];
  updateUserList: (users: IUserType[]) => void;
}

export class EditorStateProvider extends Component<
  IEditorStateProviderProps,
  IEditorStateProviderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isEditable: true,
      updateIsEditable: this.updateIsEditable,
      updateCurrentUser: this.updateCurrentUser,
      currentUser: props.initialUser,
      users: props.initialUserList,
      updateUserList: this.updateUserList,
    };
  }

  public updateIsEditable = (isEditable: boolean) => {
    this.setState({ isEditable });
  };

  public updateCurrentUser = (newUser: IUserType) => {
    this.setState({ currentUser: newUser, isEditable: newUser.teacher });
  };

  public updateUserList = (users: IUserType[]) => {
    this.setState({ users });
  };

  public render() {
    return (
      <EditorStateContext.Provider value={this.state}>
        {this.props.children}
      </EditorStateContext.Provider>
    );
  }
}
