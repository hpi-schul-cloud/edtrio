import { Block, Editor } from "slate";

const schema: object = {
  document: {
    nodes: [
      { match: [{ type: "title" }], min: 1, max: 1 },
      { match: [{ type: "section" }], min: 1 },
    ],
    normalize: (editor: Editor, { code, node, child, index }: any) => {
      switch (code) {
        case "child_type_invalid": {
          const type = index === 0 ? "title" : "section";
          return editor.setNodeByKey(child.key, type);
        }
        case "child_min_invalid": {
          const block = Block.create(index === 0 ? "title" : "section");
          return editor.insertNodeByKey(node.key, index, block);
        }
      }
      return;
    },
  },
  blocks: {
    title: {},
    userImage: {
      isVoid: true,
    },
    section: {
      data: {
        isVisible: (v: any) => typeof v === "boolean",
      },
      parent: { object: "document" },
      last: { type: "p" },
      normalize: (editor: Editor, { code, node, child }: any) => {
        switch (code) {
          case "last_child_type_invalid": {
            const index = node.nodes.size;
            const newParagraph = Block.create("p");
            editor.insertNodeByKey(node.key, index, newParagraph);
            return true;
          }
        }
        return;
      },
    },
    paragraph: {
      nodes: [
        {
          match: { object: "text" },
        },
      ],
    },
    code: {},
    embed: {},
    audio: {
      isVoid: true,
    },
    sortingTask: {
      isVoid: true,
    },
  },
};

export default schema;
