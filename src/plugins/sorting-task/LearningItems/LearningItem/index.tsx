import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import Textarea from "react-autosize-textarea";
import Button from "../../Button";
import { ILearningItem } from "../../interfaces";

import './styles.scss';

interface IProps {
  learningItem: ILearningItem,
  hasDescription: boolean,
  onEdit: (updateLearningItem: ILearningItem) => void,
  onDelete: () => void,
};

export default class LearningItem extends React.PureComponent<IProps> {

  public render() {
    const term = (
      <td className="learning-item__term">
        <input
          className="learning-item__input"
          type="text"
          value={ this.props.learningItem.term }
          onChange={ this.editTermHandler() }
          placeholder="Gib einen Begriff ein…"
        />
      </td>
    );

    const description = (
      <td className="learning-item__description">
        <Textarea
          className="learning-item__input"
          value={ this.props.learningItem.description }
          onChange={ this.editDescriptionHandler() }
          placeholder="Gib eine Erklärung ein…"
        />
      </td>
    );

    const actions = (
      <td className="learning-item__actions">
        <Button
          className="learning-item__action"
          theme="text"
          title="Lernbegriff löschen"
          onClick={ this.props.onDelete }
        >
          <FontAwesomeIcon icon={ faTrashAlt } />
        </Button>
      </td>
    );

    return (
      <tr className="learning-item">
        { term }
        { this.props.hasDescription && description }
        { actions }
      </tr>
    );
  }

  protected editTermHandler() {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedLearningItem = this.props.learningItem;
      updatedLearningItem.term = event.target.value;
      this.props.onEdit(updatedLearningItem);
    };
  }

  protected editDescriptionHandler() {
    return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const updatedLearningItem = this.props.learningItem;
      // Make sure users do not enter linebreaks
      updatedLearningItem.description = event.target.value.replace(/\n/g, "");
      this.props.onEdit(updatedLearningItem);
    };
  }

}