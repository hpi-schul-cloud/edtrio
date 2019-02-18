import React from "react";
import { ILearningItem, ILearningItems } from "../interfaces";
import LearningItem from "./LearningItem";
import './styles.scss';

interface IProps {
  learningItems: ILearningItems,
  hasDescriptions: boolean,
  onEdit: (updatedLearningItems: ILearningItems) => void,
}

export default class LearningItems extends React.PureComponent<IProps> {

  protected tableElement: React.Ref<HTMLTableElement>;

  constructor(props: IProps) {
    super(props);
    this.tableElement = React.createRef();
  }

  public render() {
    const rows = this.getRows().map((learningItem, index) => {
      return (
        <LearningItem
            key={ index }
            learningItem={ learningItem }
            hasDescription={ this.props.hasDescriptions }
            onEdit={ this.editHandler(index) }
            onDelete={ this.deleteHandler(index) }
        />
      );
    });

    const term = (
      <th
        className="learning-items__term"
        colSpan={ this.props.hasDescriptions ? 1 : 2 }
      >
        Begriff
      </th>
    );

    const description = (
      <th
        className="learning-items__description"
        colSpan={2}
      >
        Musterlösung
      </th>
    );

    return (
      <table
        ref={ this.tableElement }
        className="learning-items"
        onKeyDown={ this.keyHandler() }
      >
        <thead>
          <tr>
            { term }
            { this.props.hasDescriptions && description }
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  /*
   * This method returns a list of learningItems to render as rows.
   * If the last row is not empty, it appends an empty row.
   * This way, users are able to add a new learningItem to the list
   * without the need to manually append a row.
   */
  protected getRows(): ILearningItems {
    const rows = this.props.learningItems;
    const lastRow = rows[rows.length - 1];
    const lastRowIsEmpty = lastRow && !lastRow.term && !lastRow.description;

    if(!lastRowIsEmpty) {
      rows.push({
        term: '',
        description: '',
      });
    }

    return rows;
  }

  protected editHandler(index: number) {
    return (updatedLearningItem: ILearningItem) => {
      const learningItems = this.props.learningItems;
      learningItems[index] = updatedLearningItem;

      // As there’s always an empty row append to the end of
      // the list in order to allow users to add new learningItems,
      // we need to remove it here in order to get the actual
      // list of non-empty learningItems.
      const lastLearningItem = learningItems[learningItems.length - 1];
      if(lastLearningItem && !lastLearningItem.term && !lastLearningItem.description) {
        learningItems.pop();
      }

      this.props.onEdit(learningItems);
    };
  }

  protected deleteHandler(index: number) {
    return () => {
      const learningItems = this.props.learningItems;
      delete learningItems[index];
      this.props.onEdit(learningItems);
    };
  }

  /*
   * This handles keys in order to provide a quick way to
   * navigate between table cells using Ctrl, Alt, Shift
   * and arrow keys. This implementation is rather imperative,
   * making heavy use of low-level DOM-APIs.
   */
  protected keyHandler() {
    return (event: React.KeyboardEvent) => {
      const { key, metaKey, altKey, shiftKey } = event;

      // Navigation should only be possible if all three
      // modifier keys are pressed. Other key combinations
      // are typically already used by operating systems or
      // browser to navigate in form elements or between tabs
      if(!metaKey || !altKey || !shiftKey) {
        return;
      }

      event.preventDefault();  
      
      if(key === 'ArrowDown') {
        return this.focusCellBelow();
      }

      if(key === 'ArrowUp') {
        return this.focusCellAbove();
      }

      if(key === 'ArrowLeft') {
        return this.focusLeftCell();
      }

      if(key === 'ArrowRight') {
        return this.focusRightCell();
      }
    };
  }

  protected getCurrentlyFocusedCell() {
    if(!this.tableElement || this.tableElement instanceof Function || !this.tableElement.current) {
      return null;
    }

    return this.tableElement.current.querySelector('td:focus-within') as HTMLTableCellElement;
  }

  protected getCurrentlyFocusedRow() {
    const currentCell = this.getCurrentlyFocusedCell();
    return currentCell && currentCell.parentElement as HTMLTableRowElement;
  }

  protected focusCell(cell: HTMLElement | null) {
    if(cell) {
      const focusableElement = cell.querySelector('input, textarea, button') as HTMLElement;
      
      if(focusableElement) {
        focusableElement.focus();
      }
    }
  }

  protected focusCellBelow() {
    const currentCell = this.getCurrentlyFocusedCell();
    const currentRow = this.getCurrentlyFocusedRow();

    if(!currentCell || !currentRow) {
      return;
    }

    const rowBelow = currentRow.nextSibling as HTMLTableRowElement | null;
    const cellBelow = rowBelow && rowBelow.cells.item(currentCell.cellIndex);

    this.focusCell(cellBelow);
  }

  protected focusCellAbove() {
    const currentCell = this.getCurrentlyFocusedCell();
    const currentRow = this.getCurrentlyFocusedRow();

    if(!currentCell || !currentRow) {
      return;
    }

    const rowAbove = currentRow.previousSibling as HTMLTableRowElement | null;
    const cellAbove = rowAbove && rowAbove.cells.item(currentCell.cellIndex);

    this.focusCell(cellAbove);
  }

  protected focusLeftCell() {
    const currentCell = this.getCurrentlyFocusedCell();
    const leftCell = currentCell && currentCell.previousSibling as HTMLElement;
    this.focusCell(leftCell);
  }

  protected focusRightCell() {
    const currentCell = this.getCurrentlyFocusedCell();
    const rightCell = currentCell && currentCell.nextSibling as HTMLElement;
    this.focusCell(rightCell);
  }

}