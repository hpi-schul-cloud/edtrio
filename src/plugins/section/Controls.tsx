import {
  faChevronDown,
  faChevronUp,
  faEye,
  faEyeSlash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Editor, Node } from "slate";

interface IControlsProps {
  editor: Editor;
  isVisible: boolean;
}

class Controls extends Component<IControlsProps> {
  /**
   * Hides/unhides the current section
   */
  public toggleVisibilityOfSection = () => {
    const { editor, isVisible } = this.props;
    const parentSection = this.getParentSection(editor);

    if (parentSection) {
      editor.setNodeByKey(parentSection.key, {
        data: {
          isVisible: !isVisible,
        },
        type: "section",
      });
    }
  };

  /**
   * Delete the current section
   */
  public deleteSection = () => {
    const { editor } = this.props;

    const parentSection = this.getParentSection(editor);

    if (parentSection) {
      editor.removeNodeByKey(parentSection.key);
    }
  };

  /**
   * Move the current section up or down
   * @param {string} direction `UP` or `DOWN`
   */
  public moveSection = (direction: "UP" | "DOWN") => {
    const { editor } = this.props;

    const currentSection = this.getParentSection(editor);
    const { document } = editor.value;

    if (currentSection) {
      let moveToSection: Node | null;

      if (direction === "UP") {
        moveToSection = document.getPreviousSibling(currentSection.key);
      } else if (direction === "DOWN") {
        moveToSection = document.getNextSibling(currentSection.key);
      } else {
        // ONLY "UP" OR "DOWN" ARE ALLOWED FOR PARAMETER direction'
        return;
      }

      if (
        !moveToSection ||
        ("type" in moveToSection && moveToSection.type !== "section")
      ) {
        return;
      }

      const moveToIndex = document.nodes.findIndex(node => {
        if (node && moveToSection && node.key === moveToSection.key) {
          return true;
        }
        return false;
      });

      editor.moveNodeByKey(currentSection.key, document.key, moveToIndex);
    }
  };

  public getParentSection = (editor: Editor) => {
    let parent: Node | null = editor.value.anchorBlock;
    do {
      parent = editor.value.document.getParent(parent.key);

      if (!parent) {
        // Couldn't find parent.
        return;
      }
    } while ("type" in parent && parent.type !== "section");

    return parent;
  };

  public render() {
    const { isVisible } = this.props;

    return (
      <aside className="buttons section-controls">
        <button
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.deleteSection();
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </button>
        <button
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.moveSection("UP");
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </button>
        <button
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.moveSection("DOWN");
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
        <button
          className={`button is-white tooltip ${
            !isVisible ? "is-tooltip-active" : ""
          }`}
          data-tooltip={
            isVisible ? "Abschnitt ausblenden" : "Abschnitt ausgeblendet"
          }
          onMouseDown={e => {
            e.preventDefault();
            this.toggleVisibilityOfSection();
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </span>
        </button>
      </aside>
    );
  }
}

export default Controls;
