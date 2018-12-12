import React from "react";
import { Editor } from "slate";

export default function Headlines() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [RenderHeadlines],
  };
}

const RenderHeadlines = {
  renderNode(props: any, editor: Editor, next: any) {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "h1":
        return <h2 {...attributes}>{children}</h2>;
      case "h2":
        return <h3 {...attributes}>{children}</h3>;
      case "h3":
        return <h4 {...attributes}>{children}</h4>;
      case "h4":
        return <h5 {...attributes}>{children}</h5>;
      case "h5":
        return <h6 {...attributes}>{children}</h6>;
      default:
        return next();
    }
  },
};
