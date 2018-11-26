import React, { Fragment } from "react";
import { Editor } from "slate";
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
// TODO: not working - doesn't render image
const RenderImageNode = {
  renderNode(props: any, editor: Editor, next: any) {
    const { attributes, node, children, isFocused } = props;

    if (node.type === "userImage") {
      const src = node.data.get("src");
      return (
        <Fragment>
          <StyledImage
            src={src}
            alt="Uploaded by user"
            className={`plugin-wrapper ${isFocused ? "selected" : ""}`}
            {...attributes}
          />
          {children}
        </Fragment>
      );
    }
    return next();
  },
};
