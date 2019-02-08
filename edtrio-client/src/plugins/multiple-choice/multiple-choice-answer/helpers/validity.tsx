import { Block, Editor, Node } from "slate";

import { apolloClient } from "../../../../EditorWrapper/apolloClient";

import {
  createMultipleChoiceAnswer,
  createMultipleChoiceAnswerVariables,
} from "../../../../graphqlOperations/generated-types/createMultipleChoiceAnswer";

import {
  CREATE_MULTIPLE_CHOICE_ANSWER,
  DELETE_MULTIPLE_CHOICE_ANSWER,
} from "../../../../graphqlOperations/operations";

export async function testAnswerNodeValidity(
  editor: Editor,
  currentNode: Block,
) {
  // Test for having no id
  const answerId = currentNode.data.get("id");

  // Test for a copied node
  // @ts-ignore: this exists on the document
  const collisionNode = editor.value.document.findDescendant(
    (descendantNode: Node) =>
      "data" in descendantNode &&
      descendantNode.data.get("id") === answerId &&
      descendantNode.key !== currentNode.key,
  );
  // There is a collision node, or the answer is not initialized yet, or the answerId is an empty
  // object somehow, so it has been wrongly copied / initialized
  if (
    collisionNode ||
    !answerId ||
    (Object.keys(answerId).length === 0 && answerId.constructor === Object)
  ) {
    // node needs to be created on backend-side
    const answer = await apolloClient.mutate<
      createMultipleChoiceAnswer,
      createMultipleChoiceAnswerVariables
    >({
      mutation: CREATE_MULTIPLE_CHOICE_ANSWER,
      variables: { isCorrect: false },
    });
    if (answer && answer.data && answer.data.createMultipleChoiceAnswer) {
      editor.setNodeByKey(currentNode.key, {
        data: { id: answer.data.createMultipleChoiceAnswer.id },
        type: "multiple-choice-answer",
      });
    }
  }
}

export function checkAndDeleteNode(editor: Editor, currentNode: Block) {
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
      mutation: DELETE_MULTIPLE_CHOICE_ANSWER,
      variables: { answerId: currentNode.data.get("id") },
    });
  }
}
