import React from "react";
import Card from "../Card";
import "./style.scss";

interface IProps {
  isFlipped?: boolean,
  front?: React.ReactNode,
  back?: React.ReactNode,
};

export default class FlipCard extends React.PureComponent<IProps> {

  public render() {
    const { isFlipped, front, back } = this.props;

    return (
      <div className={ `st-flip-card ${ isFlipped && 'st-flip-card--flipped' }` }>
        <div className="st-flip-card__sides">
          <div className="st-flip-card-front">
            <Card>{ front }</Card>
          </div>
          <div className="st-flip-card-back">
            <Card>{ back }</Card>
          </div>
        </div>
      </div>
    );
  }

}
