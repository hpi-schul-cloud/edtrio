import React from "react";
import SortingTaskNode from "./SortingTaskNode";

export default () => {
  return {
    plugins: [
      RenderPlugin,
    ],
  };
}

const RenderPlugin = {
  renderNode(props: any, editor: any, next: () => void) {
    if(props.node.type === "sortingTask") {
      return <SortingTaskNode {...props} />;
    }

    return next();
  },
};