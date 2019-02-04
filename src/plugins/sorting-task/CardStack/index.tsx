import React from "react";
import "./style.scss";

interface IProps {
  cards: React.ReactNodeArray,
  currentIndex?: number,
};

export default class CardStack extends React.PureComponent<IProps> {

  public render() {
    const currentIndex = this.props.currentIndex || 0;

    const cards = this.props.cards.map((card, index) => {

      const classNames = [
        'st-card-stack__card',
        (index < currentIndex) ? 'st-card-stack__card--hidden' : 'st-card-stack__card--visible',
      ];

      return (
        <div
          key={ index }
          className={ classNames.join(' ') }
          aria-hidden={index !== currentIndex}
        >
          { card }
        </div>
      );

    });

    return (
      <div className="st-card-stack">
        { cards }
      </div>
    );
  }

}
