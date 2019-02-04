import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import "./style.scss";

interface IProps {
	label: string,
	theme: 'positive' | 'negative',
  onClick?: () => void,
};

const icons = {
  positive: faCheck,
  negative: faTimes,
};

export default class ActionButton extends React.PureComponent<IProps> {

  public render() {
    const { label, theme, onClick } = this.props;

    return (
      <button
      	className={ `st-action-button st-action-button--${ theme }` }
        title={ label }
      	aria-label={ label }
        onClick={ onClick }
    	>
    		<FontAwesomeIcon icon={ icons[theme] } />
    	</button>
    );
  }

}
