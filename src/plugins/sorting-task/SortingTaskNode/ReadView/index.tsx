import React from "react";
import { ILearningItems, ILearningItemsWithKnownState } from "../interfaces";
import FlipCard from "./FlipCard";
import ResultCard from "./ResultCard";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

interface IState {
  learningItems: ILearningItemsWithKnownState,
  currentCardIndex: number
}

export default class ReadView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const learningItems = this.props.learningItems
      .filter(learningItem => learningItem.term && learningItem.description)
      .map(learningItem => ({...learningItem, isSolved: false, wasViewed: false}))

    this.state = {
      learningItems,
      currentCardIndex: 0
    }
  }

  public render() {

    const {learningItems, currentCardIndex} = this.state;

    const unknownItemsCount = learningItems.filter(item => !item.isSolved).length;

    const visibleLearningItems = learningItems.slice(currentCardIndex);
    const learningItemNodes = visibleLearningItems.map((learningItem, index) => {
      if(learningItem.isSolved){ return null; }

      return (
        <FlipCard
          key={currentCardIndex+index}
          learningItem={learningItem}
          nextCard={this.nextCard(currentCardIndex + index)}
        />
      )
    });

    return (
      <ol className="learning-items__cards">
        {learningItemNodes}
        <ResultCard
          unknownItemsCount={unknownItemsCount}
          continue={this.continue()}
          reset={this.reset()}
        />
      </ol>
    );
  }

  protected nextCard(key: number) {
    return (answerKnown: boolean) => {
      return () => {
        const learningItems = this.state.learningItems;
        learningItems[key] = {
          ...learningItems[key],
          isSolved: answerKnown,
        };

        this.setState( {
          learningItems,
          currentCardIndex: this.state.currentCardIndex + 1
        } );
      }
    }
  }

  protected continue() {
    return () => {
      this.setState( { currentCardIndex: 0 } );
    }
  }

  protected reset() {
    return () => {
      const learningItems = this.state.learningItems.map(learningItem => ({...learningItem, isSolved: false}));
      this.setState( {
        learningItems,
        currentCardIndex: 0
      } );
    }
  }
}