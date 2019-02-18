import React from "react";
import ActionButtons from "../ActionButtons";
import FlipCard from "../FlipCard";
import { ILearningItem } from "../interfaces";
import "./style.scss";

interface IProps {
  isFlipped?: boolean,
  learningItem: ILearningItem,
  hasDescription: boolean,
  onFlip?: () => void,
  // definitely need better names for these
  onKnown?: () => void,
  onNotKnown?: () => void,
};

export default class FlashCard extends React.PureComponent<IProps> {

  public render() {

    const {
      hasDescription,
      learningItem,
      isFlipped,
      onFlip,
      onKnown,
      onNotKnown
    } = this.props;

    const front = (
      <div className="st-flash-card__front">

        <p className="st-flash-card__term">
          { learningItem.term }
        </p>

        <ActionButtons
          prompt="Kannst du den Begriff erklären?"
          confirmLabel="Ja, kann ich erklären."
          cancelLabel="Nein, kann ich nicht erklären."
          onConfirm={ hasDescription ? onFlip : onKnown }
          onCancel={ onNotKnown }
        />
        
      </div>
    );

    const back = (
      <div className="st-flash-card__back">

        <span className="st-flash-card__description">
          { learningItem.description }
        </span>

        <ActionButtons
          prompt="Hast du’s gewusst?"
          confirmLabel="Ja, wusste ich."
          cancelLabel="Nein, wusste ich nicht."
          onConfirm={ onKnown }
          onCancel={ onNotKnown }
        />

      </div>
    );

    return <FlipCard { ...{ isFlipped, front, back } } />;
  }

}
