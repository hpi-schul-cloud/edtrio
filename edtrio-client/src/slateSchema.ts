import { List } from "immutable";
import { Block, Editor, Text } from "slate";

let counter = 0;

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
          editor.setNodeByKey(child.key, type);

          return true;
        }
        case "child_min_invalid": {
          // not enough sections
          if (
            editor.value.document.nodes.some(
              nodeToTest => !!nodeToTest && nodeToTest.type === "title",
            )
          ) {
            const newSection = Block.create({
              type: "section",
              data: {
                isVisible: true,
              },
              nodes: List([
                Block.create({
                  type: "p",
                  nodes: List([Text.create({})]),
                }),
              ]),
            });
            counter++;

            const document = editor.value.document;
            const lastIndex = document.nodes.count();

            editor
              .insertNodeByKey(document.key, lastIndex, newSection)
              .moveToEndOfNode(newSection);
          } else {
            // no title node
            const document = editor.value.document;
            const newTitle = Block.create({
              type: "title",
              nodes: List([Text.create({})]),
            });
            editor.insertNodeByKey(document.key, index, newTitle);
          }
          if (counter > 100) {
            throw new Error("stop!");
          }
          return true;
        }
      }
      return;
    },
  },
  blocks: {
    title: {
      marks: [],
    },
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
            if (!("data" in child)) {
              editor.removeNodeByKey(node.key);
              return true;
            }
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
    code: {
      marks: [],
    },
    "multiple-choice": {
      nodes: [
        { match: [{ type: "multiple-choice-question" }], min: 1, max: 1 },
        { match: [{ type: "multiple-choice-answer" }], min: 1 },
      ],
      normalize: (editor: Editor, { code, node, child, index }: any) => {
        switch (code) {
          case "child_type_invalid": {
            const type =
              index === 0
                ? "multiple-choice-question"
                : "multiple-choice-answer";
            return editor.setNodeByKey(child.key, type);
          }
          case "child_min_invalid": {
            if (index === 0) {
              return editor.removeNodeByKey(node.key);
            } else {
              const block = Block.create("multiple-choice-answer");
              return editor.insertNodeByKey(node.key, index, block);
            }
          }
        }
        return;
      },
    },
    poll: {
      nodes: [
        { match: [{ type: "poll_question" }], min: 1, max: 1 },
        { match: [{ type: "poll_answer" }], min: 0 },
      ],
      normalize: (editor: Editor, { code, node, child, index }: any) => {
        switch (code) {
          case "child_min_invalid": {
            if (index === 0) {
              return editor.removeNodeByKey(node.key);
            } else {
              const block = Block.create("poll_answer");
              return editor.insertNodeByKey(node.key, index, block);
            }
          }
        }
        return;
      },
    },
    embed: { marks: [] },
    audio: {
      isVoid: true,
    },
  },
};

export default schema;
