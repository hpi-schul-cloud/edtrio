import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faChevronDown,
  faChevronUp,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

class Controls extends Component {
  /**
   * Hides/unhides the current section
   */
  toggleVisibilityOfSection = (change, onChange, isVisible) => {
    const parentSection = this.getParentSection(change);

    const c = change.setNodeByKey(parentSection.key, {
      data: {
        isVisible: !isVisible,
      },
    });
    onChange(c);
  };

  /**
   * Delete the current section
   */
  deleteSection = (change, onChange) => {
    const parentSection = this.getParentSection(change);

    const c = change.removeNodeByKey(parentSection.key);
    onChange(c);
  };

  /**
   * Move the current section up or down
   * @param {string} direction `UP` or `DOWN`
   */
  moveSection = (change, onChange, direction) => {
    const currentSection = this.getParentSection(change);
    const { document } = change.value;

    let moveToSection;
    if (direction === "UP") {
      moveToSection = document.getPreviousSibling(currentSection.key);
    } else if (direction === "DOWN") {
      moveToSection = document.getNextSibling(currentSection.key);
    } else {
      // ONLY "UP" OR "DOWN" ARE ALLOWED FOR PARAMETER direction'
      return;
    }

    if (!moveToSection || moveToSection.type !== "section") {
      return;
    }

    const moveToIndex = document.nodes.findIndex(node => {
      if (node.key === moveToSection.key) {
        return true;
      }
      return false;
    });

    const c = change.moveNodeByKey(
      currentSection.key,
      document.key,
      moveToIndex,
    );
    onChange(c);
  };

  getParentSection = change => {
    let parent = change.value.anchorBlock;
    do {
      parent = change.value.document.getParent(parent.key);

      if (!parent) {
        //Couldn't find parent.
        return;
      }
    } while (parent.type !== "section");

    return parent;
  };

  render() {
    const { editor, isVisible } = this.props;

    return (
      <aside className="buttons section-controls">
        {/* TODO: This should probably be a button */}
        <a
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.deleteSection(editor.value.change(), editor.props.onChange);
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </a>
        <a
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.moveSection(
              editor.value.change(),
              editor.props.onChange,
              "UP",
            );
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </a>
        <a
          className="button is-white"
          onMouseDown={e => {
            e.preventDefault();
            this.moveSection(
              editor.value.change(),
              editor.props.onChange,
              "DOWN",
            );
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </a>
        <a
          className={`button is-white tooltip ${
            !isVisible ? "is-tooltip-active" : ""
          }`}
          data-tooltip={
            isVisible ? "Abschnitt ausblenden" : "Abschnitt ausgeblendet"
          }
          onMouseDown={e => {
            e.preventDefault();
            this.toggleVisibilityOfSection(
              editor.value.change(),
              editor.props.onChange,
              isVisible,
            );
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </span>
        </a>
      </aside>
    );
  }
}

export default Controls;
