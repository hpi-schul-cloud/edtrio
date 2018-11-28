import React from "react";
import { Block, Editor } from "slate";

import isUrl from "is-url";

import Hotkey from "../../helpers/Hotkey";
import handleUrl from "./handlers";
import ServiceTypeIcon from "./ServiceTypeIcon";

export default function Embed() {
  return {
    plugins: [
      Hotkey("Control+e", toggleEmbedBlock),
      RenderEmbedNode,
      // RenderEmbedPlaceholder,
    ],
  };
}

function toggleEmbedBlock(editor: Editor) {
  const isCode = editor.value.blocks.some((block: Block | undefined) => {
    if (block) {
      return block.type === "embed";
    } else {
      return false;
    }
  });
  editor.setBlocks(isCode ? "p" : "embed");
  return true;
}

const RenderEmbedNode = {
  renderNode(props: any, editor: Editor, next: () => void) {
    return props.node.type === "embed" ? (
      <EmbedNode
        selected={props.isFocused}
        editor={editor}
        node={props.node}
        {...props}
      />
    ) : (
      next()
    );
  },
};
// TODO: renderPlaceholder has been removed, and its replacement slate-react-placeholder is
// buggy. It can currently only render one global placeholder for the whole editor.

// const RenderEmbedPlaceholder = {
//   renderPlaceholder({ editor, node, parent }) {
//     if (node.object !== "block") {
//       return;
//     }
//     if (node.type !== "embed") {
//       return;
//     }
//     if (node.text !== "") {
//       return;
//     }

//     // if there is a url, don't render the placeholder :-)
//     if (node.data.get("url")) {
//       return;
//     }

//     return (
//       <span
//         contentEditable={false}
//         style={{ display: "inline-block", width: "0", whiteSpace: "nowrap" }}
//         className="has-text-grey-light"
//         onMouseDown={e => {
//           const change = editor.value.change();
//           const onChange = editor.props.onChange;
//           onChange(change.moveToEndOfNode(node).focus());
//           return true;
//         }}
//       >
//         z. Bsp. https://www.youtube.com/watch?v=nS4a_bTv5_Y
//       </span>
//     );
//   },
// };

interface IEmbedNodeState {
  provider: string;
  url: string;
}

class EmbedNode extends React.Component<any, IEmbedNodeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: props.node.data.get("provider") || "",
      url: props.node.data.get("url") || "",
    };
  }

  public _setDataAttribute = (url: string, provider: string) => {
    const { editor, node } = this.props;

    editor.setNodeByKey(node.key, {
      data: {
        provider,
        url,
      },
    });
  };

  public handlePasteUrl = (e: any) => {
    e.preventDefault();

    // Get pasted data via clipboard API
    // @ts-ignore window.clipboardData is used in IE
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");

    if (!isUrl(pastedData)) {
      return;
    }

    const urlAnalysis = handleUrl(pastedData);

    if (!urlAnalysis) {
      return;
    }
    const { provider, url } = urlAnalysis;

    e.stopPropagation();
    this._setDataAttribute(url, provider);
    this.setState({
      url,
      provider,
    });
  };

  public render() {
    const { selected, attributes, children } = this.props;
    const { url, provider } = this.state;

    return (
      <React.Fragment>
        {url && (
          <div
            className={`plugin-wrapper embed-container ${
              selected ? "selected" : ""
            }`}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 5,
            }}
            {...attributes}
          >
            <iframe
              title="Video"
              style={{ minHeight: "22rem" }}
              src={url}
              frameBorder="0"
              allowFullScreen={true}
            />
          </div>
        )}
        <div className="control has-icons-left" {...attributes} style={{}}>
          <p
            className={`input ${selected && !url ? "is-focused" : ""}`}
            onPaste={this.handlePasteUrl}
          >
            {children}
            {url}
          </p>

          <span className="icon is-left">
            <ServiceTypeIcon type={provider} />
          </span>
        </div>
      </React.Fragment>
    );
  }
}
