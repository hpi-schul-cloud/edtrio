import React from "react";
import { ILearningItem } from "../../interfaces";

import './styles.scss';

interface IProps {
  learningItem: ILearningItem,
  onEdit: (updateLearningItem: ILearningItem) => void,
};

export default class LearningItem extends React.PureComponent<IProps> {

  public render() {
    return (
      <tr>
        <td className="learning-items__cell">
          <input
            className="learning-items__cell-input"
            type="text"
            value={this.props.learningItem.term}
            onChange={this.editHandler('term')}
            placeholder="Gib einen Begriff ein…"
          />
        </td>
        <td className="learning-items__cell">
          <input
            className="learning-items__cell-input"
            type="text"
            value={this.props.learningItem.description}
            onChange={this.editHandler('description')}
            placeholder="Gib eine Erklärung ein…"
          />
        </td>
      </tr>
    );
  }

  protected editHandler(key: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedLearningItem = this.props.learningItem;
      updatedLearningItem[key] = event.target.value;
      this.props.onEdit(updatedLearningItem);
    };
  }

}