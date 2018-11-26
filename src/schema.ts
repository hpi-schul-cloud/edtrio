export default {
  document: {
    nodes: [
      { match: [{ type: "title" }], min: 1, max: 1 },
      { match: [{ type: "section" }], min: 1 },
    ],
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
    },
    paragraph: {
      nodes: [
        {
          match: { object: "text" },
        },
      ],
    },
  },
};
