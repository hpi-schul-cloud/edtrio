import React from "react";
import EditView from "./EditView";
import ReadView from "./ReadView";

import { ILearningItems } from "./interfaces";

interface IProps {
  attributes: object,
  readOnly: boolean,
  isFocused: boolean,
  editor: any,
  node: any,
};

interface IState {
  learningItems: ILearningItems,
};

/*
 * `SortingTaskNode` is rendered by `sortingTask` blocks. `sortingTask`
 * are void blocks. I. e., by default, users won’t be able to edit its
 * contents or values. Instead, they’ll have to use the user interface
 * provided by this component.
 */
export default class SortingTaskNode extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    // TODO: This is only a temporary solution as long as there is no
    // interface to actually add new learningItems.
    const defaultState = {
      learningItems: [ { term: 'Term A', description: 'Description A' } ],
    };

    this.state = this.loadState() || defaultState;
  }

  public render() {
    const { attributes, readOnly, isFocused } = this.props;

    return (
      <div
        className={`plugin-wrapper ${ isFocused && 'selected' }`}
        onClick={this.clickHandler()}
        {...attributes}
       >
        { readOnly
          ? <ReadView learningItems={this.state.learningItems} />
          : <EditView learningItems={this.state.learningItems} onEdit={this.editHandler()} />
        }
      </div>
    );
  }

  /*
   * Returns an event handler to handle all click events on this
   * component. By default, clicking on a void block moves focus
   * to the block clicked on. Thus, any inputs inside the void
   * block wouldn’t be focusable. To solve this, we simply stop
   * event propagation.
   */
  protected clickHandler() {
    return (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
    };
  }

  /*
   * Returns an event handler to handle edit events from the
   * `EditView` subcomponent.
   */
  protected editHandler() {
    return (learningItems: ILearningItems) => {
      this.setState({ learningItems }, this.persistState);
    };
  }

  /*
   * This method saves the current (and possibly updated)
   * state in the block’s `data` property. This is important,
   * as the component state itself won’t be persistet.
   */
  protected persistState() {
    this.props.editor.setNodeByKey(
      this.props.node.key, {
      data: {
        state: this.state,
      },
    });
  }

  /*
   * Loads the state from the block’s `data` property.
   */
  protected loadState() {
    return this.props.node.data.get("state");
  }

}