import { Block, Editor, Node } from "slate";

import { apolloClient } from "../../../EditorWrapper/apolloClient";

// import {
//   createPoll,
// } from "../../../generated-types/createPoll";

import {
  CREATE_POLL,
  CREATE_POLL_ANSWER,
  DELETE_POLL,
  DELETE_POLL_ANSWER,
} from "../../../graphqlOperations/operations";

export async function testPollNodeValidity(
  editor: Editor,
  currentNode: Block,
  context: any,
) {
  // Test for having no id
  const pollId = currentNode.data.get("id");

  // Test for a copied node
  // @ts-ignore: this exists on the document
  const collisionNode = editor.value.document.findDescendant(
    (descendantNode: Node) =>
      "data" in descendantNode &&
      descendantNode.data.get("id") === pollId &&
      descendantNode.key !== currentNode.key,
  );
  // There is a collision node, or the answer is not initialized yet, or the answerId is an empty
  // object somehow, so it has been wrongly copied / initialized
  if (
    collisionNode ||
    !pollId ||
    (Object.keys(pollId).length === 0 && pollId.constructor === Object)
  ) {
    // node needs to be created on backend-side
    const poll = await apolloClient.mutate({
      mutation: CREATE_POLL,
      variables: { votingAllowed: false, displayResults: false },
    });
    if (poll && poll.data && poll.data.createPoll) {
      context.updateVotingAllowed(poll.data.createPoll.votingAllowed);
      context.updateDisplayResults(poll.data.createPoll.displayResults);
      context.updateId(poll.data.createPoll.id);
      editor.setNodeByKey(currentNode.key, {
        data: { id: poll.data.createPoll.id },
        type: "poll",
      });
    }
  }
}

export function checkAndDeletePollNode(editor: Editor, currentNode: Block) {
  if (
    // @ts-ignore: this exists on the document
    !editor.value.document.findDescendant(
      (descendantNode: Node) =>
        "data" in descendantNode &&
        "data" in currentNode &&
        descendantNode.data.get("id") === currentNode.data.get("id"),
    )
  ) {
    // node has been deleted :O
    apolloClient.mutate({
      mutation: DELETE_POLL,
      variables: { answerId: currentNode.data.get("id") },
    });
  }
}

export async function testPollAnswerNodeValidity(
  editor: Editor,
  currentNode: Block,
  context: any,
  parent: Block,
) {
  // Test for having no id
  const pollAnswerId = currentNode.data.get("id");

  // Test for a copied node
  // @ts-ignore: this exists on the document
  const collisionNode = editor.value.document.findDescendant(
    (descendantNode: Node) =>
      "data" in descendantNode &&
      descendantNode.data.get("id") === pollAnswerId &&
      descendantNode.key !== currentNode.key,
  );
  // There is a collision node, or the answer is not initialized yet, or the answerId is an empty
  // object somehow, so it has been wrongly copied / initialized
  if (
    collisionNode ||
    !pollAnswerId ||
    (Object.keys(pollAnswerId).length === 0 &&
      pollAnswerId.constructor === Object)
  ) {
    // node needs to be created on backend-side
    const pollId = parent.data.get("id");
    const pollAnswer = await apolloClient.mutate({
      mutation: CREATE_POLL_ANSWER,
      variables: { pollId: "cjr6l0fiv004i0775e7bfcu7a" },
    });
    console.log(pollAnswer);
    if (pollAnswer && pollAnswer.data && pollAnswer.data.createPollAnswer) {
      editor.setNodeByKey(currentNode.key, {
        data: { id: pollAnswer.data.createPollAnswer.id },
        type: "poll_answer",
      });
    }
  }
}

export function checkAndDeletePollAnswerNode(
  editor: Editor,
  currentNode: Block,
) {
  if (
    // @ts-ignore: this exists on the document
    !editor.value.document.findDescendant(
      (descendantNode: Node) =>
        "data" in descendantNode &&
        "data" in currentNode &&
        descendantNode.data.get("id") === currentNode.data.get("id"),
    )
  ) {
    // node has been deleted :O
    apolloClient.mutate({
      mutation: DELETE_POLL_ANSWER,
      variables: { answerId: currentNode.data.get("id") },
    });
  }
}
