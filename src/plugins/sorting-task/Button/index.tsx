import React from "react";
import "./style.scss";

interface IProps {
  onClick?: () => void,
  theme?: string,
  title?: string,
  className?: string,
}

export default class Button extends React.PureComponent<IProps> {

  public render() {
    const { onClick, theme, title, className } = this.props;

    return (
      <button
        className={ `st-button st-button--${theme} ${className}` }
        title={ title }
        onClick={ onClick }
      >
        { this.props.children }
      </button>
    );
  }

}
