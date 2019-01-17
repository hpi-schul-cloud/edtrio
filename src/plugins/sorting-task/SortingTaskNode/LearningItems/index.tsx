import React from "react";
import { ILearningItem, ILearningItems } from "../interfaces";
import LearningItem from "./LearningItem";

import './styles.scss';

interface IProps {
  learningItems: ILearningItems,
  onEdit: (updatedLearningItems: ILearningItems) => void,
}

export default class LearningItems extends React.PureComponent<IProps> {

  public render() {
    const rows = this.getRows().map((learningItem, index) => {
      return (
        <LearningItem
            key={index}
            learningItem={learningItem}
            onEdit={this.editHandler(index)}
        />
      );
    });

    return (
      <table className="learning-items">
        <thead>
          <tr>
            <th className="learning-items__term">Begriff</th>
            <th className="learning-items__description">Erklärung</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  /*
   * This method returns a list of learningItems to render as rows.
   * If the last row is not empty, it appends an empty row.
   * This way, users are able to add a new learningItem to the list
   * without the need to manually append a row.
   */
  protected getRows(): ILearningItems {
    const rows = this.props.learningItems;
    const lastRow = rows[rows.length - 1];
    const lastRowIsEmpty = lastRow && !lastRow.term && !lastRow.description;

    if(!lastRowIsEmpty) {
      rows.push({
        term: '',
        description: '',
      });
    }

    return rows;
  }

  protected editHandler(index: number) {
    return (updatedLearningItem: ILearningItem) => {
      const learningItems = this.props.learningItems;
      learningItems[index] = updatedLearningItem;

      // As there’s always an empty row append to the end of
      // the list in order to allow users to add new learningItems,
      // we need to remove it here in order to get the actual
      // list of non-empty learningItems.
      const lastLearningItem = learningItems[learningItems.length - 1];
      if(lastLearningItem && !lastLearningItem.term && !lastLearningItem.description) {
        learningItems.pop();
      }

      this.props.onEdit(learningItems);
    };
  }

}