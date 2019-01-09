import moment from "moment";
import React, { Component, createContext } from "react";

export const LastSavedContext = createContext<ILastSavedProviderState>({
  lastSaved: null,
  updateLastSaved: (newTimestamp: moment.Moment) => {},
});

interface ILastSavedProviderState {
  lastSaved: moment.Moment | null;
  updateLastSaved: (newTimestamp: moment.Moment) => void;
}

export class LastSavedProvider extends Component<any, ILastSavedProviderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      lastSaved: moment(new Date()),
      updateLastSaved: this.updateLastSaved,
    };
  }

  public updateLastSaved = (newTimestamp: moment.Moment) => {
    this.setState({ lastSaved: newTimestamp });
  };

  public render() {
    return (
      <LastSavedContext.Provider value={this.state}>
        {this.props.children}
      </LastSavedContext.Provider>
    );
  }
}
