import React from "react";
import Button from "../Button";
import Card from "../Card";
import "./style.scss";

interface IProps {
  unknownCount: number,
  onContinue?: () => void,
  onReset?: () => void,
}

export default class ResultCard extends React.PureComponent<IProps> {

  public render() {
    const { unknownCount, onContinue, onReset } = this.props;

    const unknown = unknownCount === 1
      ? "1 Begriff"
      : `${ unknownCount } Begriffe`;

    const message = unknownCount <= 0
      ? "Du kennst alle Begriffe!"
      : `Du kennst alle bis auf ${ unknown }.`

    return (
      <Card>
        <div className="st-result-card">

          <h2 className="st-result-card__heading">
            😊 Super! 👍<br />
            { message }
          </h2>

          <Button
            theme={ unknownCount <= 0 ? "primary" : "text"}
            onClick={ onReset }
          >
            Von vorne beginnen
          </Button>

          { unknownCount <= 0 ? null :
            <Button
              theme="primary"
              onClick={ onContinue }
            >
                { unknown } wiederholen
            </Button>
          }

        </div>

      </Card>
    );
  }

}
