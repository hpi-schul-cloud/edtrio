import React from "react";
import { ILearningItem } from "../../interfaces";

import "./style.scss";

interface IProps {
    learningItem: ILearningItem,
};

export default class FlipCard extends React.PureComponent<IProps> {

    public render() {
        return (
            <li className="flip-card">
                <div className="flip-card__inner">
                    <div className="flip-card__front flip-card__content">
                        <h2 className="flip-card__title">Kannst du diesen Begriff erklären?</h2>
                        <p className="flip-card__text">{this.props.learningItem.term}</p>
                    </div>
                    <div className="flip-card__back flip-card__content">
                        <h2 className="flip-card__title">Erklärung:</h2>
                        <p className="flip-card__text">{this.props.learningItem.description}</p>
                    </div>
                </div>
            </li>
        );
    }
}