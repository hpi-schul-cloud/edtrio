import React from "react";
import CardStack from "../CardStack";
import FlashCard from "../FlashCard";
import { IFlashCards, ILearningItems } from "../interfaces";
import OnboardingCard from "../OnboardingCard";
import ResultCard from "../ResultCard";
import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

interface IState {
  cards: IFlashCards,
  currentCardStackIndex: number,
  isOnboardingCardFlipped: boolean,
  hasPassedOnboarding: boolean,
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
        isSolved: false,
        isFlipped: false,
      };
    });

    this.state = {
      cards,
      currentCardStackIndex: 0,
      isOnboardingCardFlipped: false,
      hasPassedOnboarding: false,
    }
  }

  public render() {
    const { currentCardStackIndex } = this.state;

    const onboardingCard = this.renderOnboardingCard();
    const flashCards = this.renderFlashCards();
    const resultCard = this.renderResultCard();

    return (
      <div className="st-read-view">
        <div className="st-read-view__cards">
          <CardStack
            currentIndex={ currentCardStackIndex }
            cards={[
              onboardingCard,
              ...flashCards,
              resultCard
            ]}
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

  protected renderOnboardingCard() {
    const onFlip = () => {
      this.setState({ isOnboardingCardFlipped: true });
    };

    const onStart = () => {
      this.setState({ hasPassedOnboarding: true }, () => {
        this.showNextUnknownCard();
      });
    }

    return (
      <OnboardingCard
        isFlipped={ this.state.isOnboardingCardFlipped }
        onFlip={ onFlip }
        onStart={ onStart }
      />
    );
  }

  protected renderResultCard() {
    const { cards } = this.state;
    const unknownCount = cards.reduce((total, card) => {
      return card.isSolved ? total : total + 1;
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
        isSolved: false,
      };
    });

    this.setState({ cards }, () => {
      // We need to make sure that `showFirstUnknownCard()`
      // is executed AFTER resetting the cards. React
      // doesn’t necessarily execute state updates in
      // order.
      this.showFirstUnknownCard();
    });
  }

  protected continue() {
    const cards = this.state.cards.map(card => {
      return {
        ...card,
        isFlipped: false,
      };
    });

    this.setState({ cards }, () => {
      // We need to make sure that `showFirstUnknownCard()`
      // is executed AFTER resetting the cards. React
      // doesn’t necessarily execute state updates in
      // order.
      this.showFirstUnknownCard();
    });
  }

  protected showNextUnknownCard() {
    const { cards, currentCardStackIndex } = this.state;

    // - 1 to remove the offset introduced by the OnboardingCard
    let nextIndex = cards.findIndex((card, index) => {
      return index > (currentCardStackIndex - 1) && !card.isSolved;
    });

    if(nextIndex === -1) {
      // there doesn't exist a next LearningItemCard
      // => set currentCardStackIndex to the (last) resultCard
      nextIndex = cards.length + 1;
    }else{
      // + 1 to redo our offset correction
      nextIndex += 1;
    }
    this.setState({ currentCardStackIndex: nextIndex });
  }

  protected showFirstUnknownCard() {
    this.setState({ currentCardStackIndex: 0 }, () => {
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
      cards[index].isSolved = true;
      this.setState({ cards }, () => {
        // We need to make sure that `showNextUnknownCard()`
        // is executed after setting the state. React
        // doesn’t necessarily execute state updates in
        // order.
        this.showNextUnknownCard();
      });
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