import React from "react";
import ActionButton from "../ActionButton";
import "./style.scss";

interface IProps {
  prompt: string,
  confirmLabel: string,
  cancelLabel: string,
  onConfirm?: () => void,
  onCancel?: () => void,
};

export default class ActionButtons extends React.PureComponent<IProps> {

  public render() {
    const {
      prompt,
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel
    } = this.props;

    return (
      <div className="st-action-buttons">

        <p>{ prompt }</p>

        <ActionButton
          theme="positive"
          label={ confirmLabel }
          onClick={ onConfirm }
        />

        <ActionButton
          theme="negative"
          label={ cancelLabel }
          onClick={ onCancel }
        />
        
      </div>
    );
  }

}
