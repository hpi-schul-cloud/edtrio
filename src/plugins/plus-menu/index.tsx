import React, { Fragment } from "react";
import { Editor } from "slate";
import PlusMenu from "./PlusMenu";

export default function PlusMenuPlugin() {
  return {
    changes: {},
    helpers: {},
    components: {
      PlusMenu,
    },
    plugins: [addPlusMenuBesideEditor],
  };
}

const addPlusMenuBesideEditor = {
  renderEditor(props: any, editor: Editor, next: any) {
    const restOfEditor = next();
    return (
      <Fragment>
        <PlusMenu editor={editor} startBlock={editor.value.startBlock} />
        {restOfEditor}
      </Fragment>
    );
  },
};
