import React, { Fragment } from "react";
import { Editor, Mark } from "slate";
import HoverMenu from "./HoverMenu";

export default function TextMenu() {
  return {
    changes: {},
    helpers: {},
    components: {
      HoverMenu,
    },
    plugins: [RenderTextMarks, addHoverMenuBesideEditor],
  };
}

interface IRenderTextMarksProps {
  children: any;
  mark: Mark;
  attributes: object;
}

const addHoverMenuBesideEditor = {
  renderEditor(props: any, editor: Editor, next: any) {
    const children = next();
    return (
      <Fragment>
        <HoverMenu
          editor={editor}
          selection={editor.value.selection}
          fragment={editor.value.fragment}
        />
        {children}
      </Fragment>
    );
  },
};

const RenderTextMarks = {
  renderMark(props: IRenderTextMarksProps) {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "strong":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "em":
        return <em {...attributes}>{children}</em>;
      default:
        return;
    }
  },
};
