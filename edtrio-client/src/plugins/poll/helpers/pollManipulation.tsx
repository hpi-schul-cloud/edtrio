import { List } from "immutable";
import { Block, Text } from "slate";
import { apolloClient } from "../../../EditorWrapper/apolloClient";
import {
  createPoll,
  createPollVariables,
} from "../../../graphqlOperations/generated-types/createPoll";
import {
  createPollAnswer,
  createPollAnswerVariables,
} from "../../../graphqlOperations/generated-types/createPollAnswer";
import {
  CREATE_POLL,
  CREATE_POLL_ANSWER,
} from "../../../graphqlOperations/operations";

async function createPollAnswerDBEntryAndFetchId(pollId: any) {
  const answerId = await apolloClient
    .mutate<createPollAnswer, createPollAnswerVariables>({
      mutation: CREATE_POLL_ANSWER,
      variables: { pollId },
    })
    .then(
      pollAnswer =>
        // @ts-ignore: I just created it.......... amk
        pollAnswer.data.createPollAnswer.id,
    );

  return answerId;
}

async function createPollDBEntryAndFetchId(stateValues: any) {
  const pollId = await apolloClient
    .mutate<createPoll, createPollVariables>({
      mutation: CREATE_POLL,
      variables: stateValues
        ? stateValues
        : { votingAllowed: false, displayResults: false },
    })
    .then(
      poll =>
        // @ts-ignore: I just created it.......... amk
        poll.data.createPoll.id,
    );

  return pollId;
}

export async function cloneAndDBasifyPoll(
  pollNode: Block,
  stateValues: any = null,
) {
  const pollId = await createPollDBEntryAndFetchId(stateValues);
  const neededDBAnswerEntries = pollNode.nodes.size - 1;
  const dbEntries = Array<any>();
  for (let index = 0; index < neededDBAnswerEntries; index++) {
    dbEntries.push(await createPollAnswerDBEntryAndFetchId(pollId));
  }

  const newPollContent = Array<Block>();
  newPollContent.push(
    Block.create({
      type: "poll_question",
      nodes: List([Text.create(pollNode.nodes.get(0).text)]),
    }),
  );
  dbEntries.forEach((answerId, idx) => {
    newPollContent.push(
      Block.create({
        type: "poll_answer",
        nodes: List([Text.create(pollNode.nodes.get(idx + 1).text)]),
        data: { id: answerId },
      }),
    );
  });

  const newPollNode = Block.create({
    type: "poll",
    nodes: List(newPollContent),
    data: { id: pollId },
  });
  return newPollNode;
}

export async function createNewPollAnswerForPoll(pollId: any, text: any = "") {
  const answerId = await createPollAnswerDBEntryAndFetchId(pollId);

  return Block.create({
    type: "poll_answer",
    nodes: List([Text.create(text)]),
    data: { id: answerId },
  });
}

export function createNewPollAnswerWithoutDB(text: any = "") {
  return Block.create({
    type: "poll_answer",
    nodes: List([Text.create(text)]),
    data: { id: "placeholderNode" },
  });
}
