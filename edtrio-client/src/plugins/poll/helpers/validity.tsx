import { Block, Editor, Node } from "slate";
import { apolloClient } from "../../../EditorWrapper/apolloClient";
import {
  createPollAnswer,
  createPollAnswerVariables,
} from "../../../graphqlOperations/generated-types/createPollAnswer";
import {
  deletePoll,
  deletePollVariables,
} from "../../../graphqlOperations/generated-types/deletePoll";
import {
  deletePollAnswer,
  deletePollAnswerVariables,
} from "../../../graphqlOperations/generated-types/deletePollAnswer";
import {
  CREATE_POLL_ANSWER,
  DELETE_POLL,
  DELETE_POLL_ANSWER,
} from "../../../graphqlOperations/operations";

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
  parent: Block,
) {
  const pollAnswerId = currentNode.data.get("id");

  // Test for a copied node, slate is not cool </3 and copies the answer when you press enter
  // @ts-ignore: this exists on the document
  const collisionNode = editor.value.document.findDescendant(
    (descendantNode: Node) =>
      "data" in descendantNode &&
      descendantNode.data.get("id") === pollAnswerId &&
      descendantNode.key !== currentNode.key,
  );

  if (collisionNode) {
    // we need new answer in backend and assign its id
    const pollId = parent.data.get("id");
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
