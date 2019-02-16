import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { ILearningItems } from "../interfaces";

import Button from "../Button";
import LearningItems from "../LearningItems";

import "./style.scss";

interface IProps {
  learningItems: ILearningItems,
  onEdit: (updatedTerms: ILearningItems) => void,
};

export default class EditView extends React.PureComponent<IProps> {

  public render() {
    return (
      <React.Fragment>
        Welche Begriffe sollen deine Schüler*innen erklären?

        { /* TODO: use proper notification type instead of alert */}
        <Button
          theme="text st--float-right"
          onClick={ () => alert(this.getOnboardingText()) }
        >
          <FontAwesomeIcon icon={ faQuestionCircle } />
        </Button>

        <LearningItems
            learningItems={this.props.learningItems}
            onEdit={this.props.onEdit}
        />
      </React.Fragment>
    );
  }

  private getOnboardingText(){
    return `Durchführung - “Die Sortieraufgabe”

Das Konzept basiert auf der Methode des eigenverantwortlichen Arbeitens.
Die Lehrkraft pflegt die zentralen Begriffe eines Themas in der Lehreransicht ein, optional mit einer Begriffsdefinition.
Während der Unterrichtsstunde sortieren die Schüler zunächst in Einzelarbeit die ihnen nacheinander auf Lernkarten präsentierten Begriffe, danach, ob sie diese sicher erklären bzw. anwenden können oder nicht. Hat die Lehrkraft eine Begriffsdefinition hinterlegt, so wird dem Schüler/ der Schülerin diese zum Abgleich angezeigt, bevor diese/r die Entscheidung trifft, ob der Begriff beherrscht wird. Nach dem Sortieren aller Begriffe wird dem Schüler/ der Schülerin angezeigt, wie viele Begriffe er/sie nach eigener Einschätzung beherrscht.

In einem zweiten Durchgang finden sich die SchülerInnen zu zweit oder zu dritt zusammen. Den SchülerInnen werden in diesem Durchgang jeweils nur die Karten der Begriffe angezeigt, die sie im ersten Durchlauf nicht beherrscht haben. In dieser Phase erklären sie sich die Begriffe gegenseitig und sortieren erneut.

In einem dritten Durchlauf werden den SchülerInnen dann nur noch die Karten angezeigt, die in den ersten beiden Durchläufen nicht erklärt werden konnten. Um die Wissenslücken zu schließen, ist es den Schülern in dieser Runde gestattet im Schulbuch bzw. im Lexikon nachzuschlagen beziehungsweise im Internet zu recherchieren sowie im Zweifel Rückfragen an die Lehrkraft zu stellen.`.replace(/^\n\s+/g, '\n');

  }
}