import React from "react";
import { Editor } from "slate";

import GeogebraNode from "./Geogebra";

export default function Geogebra() {
  return {
    changes: {
      insertGeogebraNode,
    },
    helpers: {},
    components: {
      GeogebraNode,
    },
    plugins: [RenderGeogebraNode],
  };
}

function insertGeogebraNode(editor: Editor, id: any, target: any) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "geogebra",
    data: { id },
  });
}

const RenderGeogebraNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    const { attributes, node, isFocused } = props;

    if (node.type === "geogebra") {
      const id = node.data.get("id");

      return (
        <GeogebraNode selected={isFocused} resourceId={id} {...attributes} />
      );
    }
    return next();
  },
};

/*
 * onClickGeogebraButton = event => {
        const { insertGeogebraNode } = Geogebra().changes

        event.preventDefault()
        const id = window.prompt('Enter the geogebra id:') || 'RHYH3UQ8'
        if(!id) return

        const change = this.state.value.change().call(insertGeogebraNode, id).call(insertParagraph)

        this.onChange(change)
    }
 */
