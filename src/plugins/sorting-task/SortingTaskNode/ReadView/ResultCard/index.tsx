import React from "react";

interface IProps {
	unknownItemsCount: number;
	continue: () => void,
	reset: () => void,
}

export default class ResultCard extends React.Component<IProps> {

	public render() {
		let knownString;
		if(this.props.unknownItemsCount === 0){ knownString = "Du wusstest alles."}
		else{ knownString = `Bis auf ${this.props.unknownItemsCount} Begriff${this.props.unknownItemsCount>1?'e':''} wusstest du alles.`;}
		return (
			<li className="card__wrapper">
				<div className="card">
					<div className="flip-card__front card__content">
						<h2 className="flip-card__title">
							😊Super!👍<br/>
							{knownString}
						</h2>
						<div className="flip-card__text">
							{this.props.unknownItemsCount &&
									<button
										className="card__button card__button--outlined card__button--yellow"
										type="button"
										onClick={this.props.continue}
									>
										{this.props.unknownItemsCount} Begriffe wiederholen.
									</button>}
					</div>
						<div className="flip-card__footer">
							<button className="card__button card__button" type="button" onClick={this.props.reset}>
								Von vorne anfangen
							</button>
						</div>
					</div>
				</div>
			</li>
		);
	}
}
