import React from "react";
import { ILearningItems } from "../interfaces";
import LearningItems from "../LearningItems";

interface IProps {
  learningItems: ILearningItems,
  hasDescriptions: boolean,
  onEdit: (updatedTerms: ILearningItems) => void,
  onDescriptionsToggle: (hasDescriptions: boolean) => void,
};

export default class EditView extends React.PureComponent<IProps> {

  public render() {
    return (
      <div className="st-edit-view">
        <h4>Sortieraufgabe</h4>
        <p>
          Das Konzept der Sortieraufgabe basiert auf den Prinzipien des eigenverantwortlichen Lernens. Im Folgenden kannst du Lernbegriffe hinterlegen, die den Schülerinnen und Schülern in Form von Lernkarten angezeigt werden. In mehreren Phasen entscheiden die Schülerinnen und Schüler in Einzel- und Kleingruppenarbeit, ob sie die Begriffe eigenständig erklären können. 
          <a
            href="https://gist.github.com/tillprochaska/3d3552385046de7abd5ba137d61c1df1"
            target="_blank"
          >
            Ausführliche Anleitung anzeigen
          </a>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              checked={ this.props.hasDescriptions }
              onChange={ this.toggleDescriptionsHandler() }
            /> 
            <strong>Musterlösungen hinterlegen</strong>, damit die Schülerinnen und Schüler sich selbst überprüfen können.
          </label>
        </p>

        <LearningItems
          learningItems={ this.props.learningItems }
          hasDescriptions={ this.props.hasDescriptions }
          onEdit={ this.props.onEdit }
        />
      </div>
    );
  }

  protected toggleDescriptionsHandler() {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      this.props.onDescriptionsToggle(event.target.checked);
    };
  }

}