import React from "react";
import { Editor } from "slate";
import SortNode from "./SortNode";

export default function Sort() {
  return {
    changes: {
      insertSort,
    },
    helpers: {},
    components: {
      SortNode,
    },
    plugins: [RenderSortNode],
  };
}

function insertSort(change: any, src: any, target: any) {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: "div",
    isVoid: true,
    data: { src },
  });
}

const RenderSortNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    const { attributes, node } = props;

    if (node.type === "div") {
      return <SortNode {...attributes} />;
    }
    return next();
  },
};
