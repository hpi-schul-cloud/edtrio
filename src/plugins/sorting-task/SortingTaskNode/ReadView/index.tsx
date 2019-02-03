import React from "react";
import { IFlashCards, ILearningItems } from "../interfaces";
import CardStack from "./CardStack";
import FlashCard from "./FlashCard";
import ResultCard from "./ResultCard";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

interface IState {
  cards: IFlashCards,
  currentCardIndex: number
}

export default class ReadView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    // Make sure we only show completely filled items
    const items = props.learningItems.filter(learningItem => {
      return learningItem.term && learningItem.description;
    });

    // Set the default state for each card
    const cards = items.map(learningItem => {
      return {
        learningItem,
        isKnown: false,
        isFlipped: false,
      };
    });

    this.state = {
      cards,
      currentCardIndex: 0
    }
  }

  public render() {
    const { currentCardIndex } = this.state;

    const flashCards = this.renderFlashCards();
    const resultCard = this.renderResultCard();

    return (
      <div className="st-read-view">
        <div className="st-read-view__cards">
          <CardStack
            cards={ [ ...flashCards, resultCard ] }
            currentIndex={ currentCardIndex }
          />
        </div>
      </div>
    );
  }

  protected renderFlashCards() {
    const { cards } = this.state;

    return cards.map((card, index) => {
      return (
        <FlashCard
          key={ index }
          isFlipped={ card.isFlipped }
          learningItem={ card.learningItem }
          onFlip={ this.flipHandler(index) }
          onKnown={ this.knownHandler(index) }
          onNotKnown={ this.notKnownHandler(index) }
        />
      );
    }); 
  }

  protected renderResultCard() {
    const { cards } = this.state;
    const unknownCount = cards.reduce((total, card) => {
      return card.isKnown ? total : total + 1;
    }, 0);

    return (
      <ResultCard
        unknownCount={ unknownCount }
        onContinue={ this.continueHandler() }
        onReset={ this.resetHandler() }
      />
    );
  }

  protected reset() {
    const cards = this.state.cards.map(card => {
      return {
        ...card,
        isFlipped: false,
        isKnown: false,
      };
    });

    this.setState({ cards, currentCardIndex: 0 });
  }

  protected continue() {
    const cards = this.state.cards.map(card => {
      return {
        ...card,
        isFlipped: false,
      };
    });

    this.setState({ cards });
    this.showFirstUnknownCard();
  }

  protected showNextUnknownCard() {
    const { cards, currentCardIndex } = this.state;

    let nextIndex = cards.findIndex((card, index) => {
      return index > currentCardIndex && !card.isKnown;
    });

    if(nextIndex < 0) {
      nextIndex = currentCardIndex + 1;
    }

    this.setState({ currentCardIndex: nextIndex });
  }

  protected showFirstUnknownCard() {
    this.setState({ currentCardIndex: -1 }, () => {
      // We need to make sure that `showNextUnknownCard()`
      // is executed after resetting the index. React
      // doesn’t necessarily execute state updates in
      // order.
      this.showNextUnknownCard();
    });
  }

  protected flipHandler(index: number) {
    const { cards } = this.state;

    return () => {
      cards[index].isFlipped = true;
      this.setState({ cards });
    };
  }

  protected knownHandler(index: number) {
    const { cards } = this.state;

    return () => {
      cards[index].isKnown = true;
      this.setState({ cards });
      this.showNextUnknownCard();
    };
  }

  protected notKnownHandler(index: number) {
    return () => this.showNextUnknownCard();
  }

  protected continueHandler() {
    return () => this.continue();
  }

  protected resetHandler() {
    return () => this.reset();
  }
  
}