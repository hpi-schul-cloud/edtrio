export default {
  document: {
    nodes: [
      { match: [{ type: "title" }], min: 1, max: 1 },
      { match: [{ type: "section" }], min: 1 },
    ],
  },
};
