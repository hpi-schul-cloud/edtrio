import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List } from "immutable";
import React, { Fragment, PureComponent } from "react";
import { Block, Editor, Text } from "slate";

interface ISectionButtonProps {
  editor: Editor;
}

export default function AddSection() {
  return {
    changes: {
      appendNewSection,
    },
    helpers: {},
    components: {
      AddSectionButton,
    },
    plugins: [addSectionButtonAfterEditor],
  };
}

const addSectionButtonAfterEditor = {
  renderEditor(props: any, editor: Editor, next: any) {
    const restOfEditor = next();
    return (
      <Fragment>
        {restOfEditor}
        {!props.readOnly && <AddSectionButton editor={editor} />}
      </Fragment>
    );
  },
};

class AddSectionButton extends PureComponent<ISectionButtonProps> {
  public render() {
    return (
      <div className="level">
        <button
          className="level-item button is-white has-text-grey"
          style={{
            margin: "1rem 0",
          }}
          onMouseDown={event => appendNewSection(event, this.props.editor)}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span>Abschnitt hinzuf&uuml;gen</span>
        </button>
      </div>
    );
  }
}

const appendNewSection = (event: any, editor: Editor) => {
  event.preventDefault();

  const newSection = Block.create({
    type: "section",
    data: {
      isVisible: true,
    },
    nodes: List([
      Block.create({
        type: "p",
        nodes: List([Text.create({})]),
      }),
    ]),
  });

  const document = editor.value.document;
  const lastIndex = document.nodes.count();

  return editor
    .insertNodeByKey(document.key, lastIndex, newSection)
    .moveToEndOfNode(newSection);
};
