import { Block, Editor, Node } from "slate";

import { apolloClient } from "../../../EditorWrapper/apolloClient";

import {
  createPoll,
  createPollVariables,
} from "../../../graphqlOperations/generated-types/createPoll";

import {
  deletePoll,
  deletePollVariables,
} from "../../../graphqlOperations/generated-types/deletePoll";

import {
  createPollAnswer,
  createPollAnswerVariables,
} from "../../../graphqlOperations/generated-types/createPollAnswer";

import {
  deletePollAnswer,
  deletePollAnswerVariables,
} from "../../../graphqlOperations/generated-types/deletePollAnswer";

import {
  CREATE_POLL,
  CREATE_POLL_ANSWER,
  DELETE_POLL,
  DELETE_POLL_ANSWER,
} from "../../../graphqlOperations/operations";

export async function testPollNodeValidity(
  editor: Editor,
  currentNode: Block,
  initState: Function,
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
    const poll = await apolloClient.mutate<createPoll, createPollVariables>({
      mutation: CREATE_POLL,
      variables: { votingAllowed: false, displayResults: false },
    });
    if (poll && poll.data && poll.data.createPoll) {
      const { id, votingAllowed, displayResults } = poll.data.createPoll;
      initState(id, votingAllowed, displayResults, []);
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
    apolloClient.mutate<deletePoll, deletePollVariables>({
      mutation: DELETE_POLL,
      variables: { pollId: currentNode.data.get("id") },
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
  // TODO: This is not working for us
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
    const pollId = await parent.data.get("id");
    const pollAnswer = await apolloClient.mutate<
      createPollAnswer,
      createPollAnswerVariables
    >({
      mutation: CREATE_POLL_ANSWER,
      variables: { pollId },
    });
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
    apolloClient.mutate<deletePollAnswer, deletePollAnswerVariables>({
      mutation: DELETE_POLL_ANSWER,
      variables: { pollAnswerId: currentNode.data.get("id") },
    });
  }
}
