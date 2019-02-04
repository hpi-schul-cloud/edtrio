import React from "react";
import "./style.scss";

export default class Card extends React.PureComponent<{}> {

  public render() {
    return (
      <div className="st-card">
        <div className="st-card__content">
          { this.props.children }
        </div>
      </div>
    );
  }

}
