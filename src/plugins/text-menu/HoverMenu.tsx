import React, { PureComponent } from "react";
import { Editor, Mark, Node, Selection } from "slate";
import styled from "styled-components";
// @ts-ignore
import Button from "../../helpers/Button";
// @ts-ignore
import Icon from "../../helpers/Icon";

const DEFAULT_NODE = "p";

const StyledHoverMenu = styled.div`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`;

interface IHoverMenuProps {
  className?: string;
  editor: Editor;
  selection: Selection;
  fragment: any;
}

class HoverMenu extends PureComponent<IHoverMenuProps> {
  public menuWrapper: any;

  public render() {
    const { className, fragment, selection } = this.props;

    let style: object = {};
    // Check whether any input is selected and move the menu to that position
    if (
      !(selection.isBlurred || selection.isCollapsed || fragment.text === "")
    ) {
      const nativeSelection = window.getSelection();
      const range = nativeSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      style = {
        opacity: 1,
        top: `${rect.top +
          window.pageYOffset -
          this.menuWrapper.offsetHeight}px`,
        left: `${rect.left +
          window.pageXOffset -
          this.menuWrapper.offsetWidth / 2 +
          rect.width / 2}px`,
      };
    }

    return (
      <StyledHoverMenu
        className={className}
        ref={wrapper => (this.menuWrapper = wrapper)}
        style={style}
      >
        {this.renderMarkButton("strong", "format_bold")}
        {this.renderMarkButton("em", "format_italic")}
        {this.renderMarkButton("code", "code")}
        {this.renderBlockButton("h1", "looks_one", this.onClickBlock)}
        {this.renderBlockButton("h2", "looks_two", this.onClickBlock)}
      </StyledHoverMenu>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  public renderMarkButton(type: string, icon: any) {
    const { editor } = this.props;
    const isActive = editor.value.activeMarks.some((mark: Mark | undefined) =>
      mark ? mark.type === type : false,
    );
    return (
      <Button
        reversed={true}
        active={isActive}
        onMouseDown={(event: any) => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  public renderBlockButton = (
    type: string,
    icon: any,
    onClickBlock: (event: any, type: string) => void,
  ) => {
    const isActive = this.hasBlock(type);

    return (
      <Button
        reversed={true}
        active={isActive}
        onMouseDown={(event: any) => onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  public hasBlock = (type: string) => {
    const { editor } = this.props;
    return editor.value.blocks.some((node: Node | undefined) => {
      if (!node || !("type" in node)) {
        return false;
      }
      return node ? node.type === type : false;
    });
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */
  public onClickMark(event: any, type: string) {
    const { editor } = this.props;
    event.preventDefault();
    editor.toggleMark(type);
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  public onClickBlock = (event: any, type: string) => {
    const { editor } = this.props;
    event.preventDefault();

    const isActive = this.hasBlock(type);
    editor.setBlocks(isActive ? DEFAULT_NODE : type);
  };
}

export default HoverMenu;
