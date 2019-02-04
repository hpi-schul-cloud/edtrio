import React from "react";
import Button from "../Button";
import FlipCard from "../FlipCard";
import "./style.scss";

interface IProps {
  isFlipped?: boolean,
  onFlip?: () => void,
  onStart?: () => void,
};

export default class OnboardingCard extends React.PureComponent<IProps> {

  public render() {
    const { isFlipped, onFlip, onStart } = this.props;

    const front = (
      <div className="st-onboarding-card">

        <div className="st-onboarding-card__text">
          <h2>So geht’s…</h2>
          <p>
            Dir werden im Folgenden Karten mit Begriffen aus dem Unterricht gezeigt. Erkläre Dir jeden Begriff zunächst selbst. Anschließend klicke auf den grünen Button, falls du den Begriff sicher erklären kannst. Falls nicht, klicke auf den roten Button.
          </p>
        </div>

        <Button onClick={ onFlip }>
          Weiter...
        </Button>

      </div>
    );

    const back =(
      <div className="st-onboarding-card">

        <p className="st-onboarding-card__text">
          Auf der Rückseite der Karte findest du eine Musterlösung. Prüfe, ob du den Begriff richtig erklärt hast und klicke wieder auf einen der Buttons.
        </p>

        {/*
        <Button
          theme="text"
          onClick={ () => alert('Not implemented!') }
        >
          Ausführliche Hilfe anzeigen
        </Button>
        */}

        <Button onClick={ onStart }>
          Mit dem Lernen beginnen
        </Button>

      </div>
    );

    return <FlipCard { ...{ isFlipped, front, back } } />;

  }

}
