import React, { PureComponent, ReactNode } from "react";
import "./style.css";

import { Editor, Node } from "slate";
import Controls from "./Controls";

export default function Section() {
  return {
    changes: {},
    helpers: {},
    components: {},
    plugins: [RenderSectionNode, RenderPNode],
  };
}

const RenderSectionNode = {
  renderNode(
    {
      attributes,
      children,
      node,
      isFocused,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
      isFocused: boolean;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "section") {
      return (
        <SectionNode
          node={node}
          attributes={attributes}
          editor={editor}
          isFocused={isFocused}
        >
          {children}
        </SectionNode>
      );
    }
    return next();
  },
};

interface ISectionNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
}

class SectionNode extends PureComponent<ISectionNodeProps> {
  public render() {
    const { node, children, isFocused, attributes, editor } = this.props;
    // @ts-ignore only invoked on section type blocks
    const isVisible = node.data.get("isVisible");
    return (
      <section
        className={`section content ${!isVisible ? "hidden" : ""}`}
        {...attributes}
      >
        {children}
        {isFocused ? <Controls editor={editor} isVisible={isVisible} /> : null}
      </section>
    );
  }
}

const RenderPNode = {
  renderNode(
    {
      attributes,
      children,
      node,
    }: {
      attributes: object;
      children: ReactNode;
      node: Node;
    },
    editor: Editor,
    next: () => void,
  ) {
    if ("type" in node && node.type === "p") {
      return <p {...attributes}>{children}</p>;
    }
    return next();
  },
};
