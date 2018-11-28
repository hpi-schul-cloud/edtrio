import React, { Fragment, PureComponent } from "react";
import { Editor, Node } from "slate";
import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  margin-left: auto;
  margin-right: auto;
`;

export default function Image() {
  return {
    changes: {
      insertImage,
    },
    helpers: {},
    components: {},
    plugins: [RenderImageNode],
  };
}

/**
 * Change that inserts an image block displaying the src image
 */

function insertImage(editor: Editor, src: string | ArrayBuffer, target: any) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "userImage",
    data: { src },
  });
}

/**
 * Overwrites Slates Editor.renderNode(props) to actually render
 * ImageNode for `img` tags
 */

interface IImageNodeProps {
  node: Node;
  isFocused: boolean;
  attributes: object;
}

class ImageNode extends PureComponent<IImageNodeProps> {
  public render() {
    const { node, isFocused, attributes } = this.props;
    // @ts-ignore it's only invoked on an image node
    const src = node.data.get("src");
    return (
      <StyledImage
        src={src}
        alt="Uploaded by user"
        className={`plugin-wrapper ${isFocused ? "selected" : ""}`}
        {...attributes}
      />
    );
  }
}

const RenderImageNode = {
  renderNode(props: any, editor: Editor, next: any) {
    const { attributes, node, children, isFocused } = props;

    if (node.type === "userImage") {
      return (
        <Fragment>
          <ImageNode
            node={node}
            isFocused={isFocused}
            attributes={attributes}
          />

          {children}
        </Fragment>
      );
    }
    return next();
  },
};
