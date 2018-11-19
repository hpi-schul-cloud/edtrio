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
    const children = next();
    return (
      <Fragment>
        <PlusMenu editor={editor} />
        {children}
      </Fragment>
    );
  },
};
