import React, { Component, createContext } from "react";

export const IsEditableContext = createContext<IIsEditableProviderState>({
  isEditable: true,
  updateIsEditable: (isEditable: boolean) => {},
});

interface IIsEditableProviderState {
  isEditable: boolean;
  updateIsEditable: (isEditable: boolean) => void;
}

export class IsEditableProvider extends Component<
  any,
  IIsEditableProviderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isEditable: true,
      updateIsEditable: this.updateIsEditable,
    };
  }

  public updateIsEditable = (isEditable: boolean) => {
    this.setState({ isEditable });
  };

  public render() {
    return (
      <IsEditableContext.Provider value={this.state}>
        {this.props.children}
      </IsEditableContext.Provider>
    );
  }
}
