import React from "react";

export default function Sort(options) {
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

function insertSort(change, src, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: "div",
    isVoid: true,
    data: { src },
  });
}

function SortNode(props) {
  return <div {...props}>Sort</div>;
}

const RenderSortNode = {
  renderNode(props) {
    const { attributes, node } = props;

    if (node.type === "div") {
      return <SortNode {...attributes} />;
    }
  },
};
