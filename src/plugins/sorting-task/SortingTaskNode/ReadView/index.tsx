import React from "react";
import { ILearningItems } from "../interfaces";
import FlipCard from "./FlipCard";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
};

export default class ReadView extends React.PureComponent<IProps> {

  public render() {
    const learningItems = this.props.learningItems
    .filter(learningItem => learningItem.term && learningItem.description)
    .map((learningItem, index) => {
      return (
        <FlipCard key={index} learningItem={learningItem} />
      );
    });

    return <ol className="learning-items-cards">{learningItems}</ol>;
  }

}