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
    type: "quiz",
    isVoid: true,
  });
}

const RenderSortNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    return props.node.type === "quiz" ? (
      <SortNode {...props} />
    ) : (
      next()
    );
  },
};
