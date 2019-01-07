import React from "react";
import { ILearningItems } from "../interfaces";
import LearningItems from "../LearningItems";

interface IProps {
  learningItems: ILearningItems,
  onEdit: (updatedTerms: ILearningItems) => void,
};

export default class EditView extends React.PureComponent<IProps> {

  public render() {
    return (
      <React.Fragment>
        Welche Begriffe sollen deine Schüler*innen erklären?
        <LearningItems
            learningItems={this.props.learningItems}
            onEdit={this.props.onEdit}
        />
      </React.Fragment>
    );
  }

}