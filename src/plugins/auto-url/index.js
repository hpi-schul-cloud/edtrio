import React from "react";

import InstantReplace from "slate-instant-replace";
import isUrl from "is-url";

export default function AutoURL(options) {
  return {
    changes: {
      wrapLink,
      unwrapLink,
    },
    helpers: {},
    components: {
      LinkNode,
    },
    plugins: [InstantReplace(AddURL), RenderLinkNode],
  };
}

/**
 * Wraps the supplied change as an inline link type
 * @param {*} change change to be manipulated
 * @param {string} href url of the link to be set
 */
const wrapLink = (change, href) => {
  change.wrapInline({
    type: "a",
    data: { href },
  });
  change.collapseToEnd();
};

/**
 * Removes any inline link type on the supplied change
 * @param {*} change change to be manipulated
 */
const unwrapLink = change => {
  change.unwrapInline("a");
};

const AddURL = (change, lastWord) => {
  if (isUrl(lastWord)) {
    change.extend(-lastWord.length);
    change.focus();

    change.call(unwrapLink);

    const href = lastWord.startsWith("http") ? lastWord : `https://${lastWord}`;

    change.call(wrapLink, href);
  }
};

/**
 * Component to be rendered for every link inline element
 * @param {*} props not used atm
 */
function LinkNode(props) {
  const { attributes, children, node } = props;
  const { data } = node;
  const href = data.get("href");

  return (
    <a {...attributes} href={href}>
      {children}
    </a>
  );
}

const RenderLinkNode = {
  renderNode(props) {
    return props.node.type === "a" ? <LinkNode {...props} /> : null;
  },
};
