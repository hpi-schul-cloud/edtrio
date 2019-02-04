import React from "react";
import "./style.scss";

interface IProps {
  onClick?: () => void,
  theme?: string,
}

export default class Button extends React.PureComponent<IProps> {

  public render() {
    const { onClick, theme } = this.props;

    return (
      <button
        className={ `st-button st-button--${theme}` }
        onClick={ onClick }
      >
        { this.props.children }
      </button>
    );
  }

}
