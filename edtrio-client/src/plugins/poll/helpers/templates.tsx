import { List } from "immutable";
import { Block, Text } from "slate";
import { createNewPollAnswerWithoutDB } from "./pollManipulation";

export function getFeedbackTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Was hat dir in der heutigen Stunde am meisten gefehlt?"),
        ]),
      }),
      createNewPollAnswerWithoutDB("Nichts! Ich bin zufrieden"),
      createNewPollAnswerWithoutDB("Zeit. Ich hätte gerne mehr Zeit gehabt"),
      createNewPollAnswerWithoutDB("Erklärung. Ich habe kaum etwas verstanden"),
      createNewPollAnswerWithoutDB(
        "Vielfalt. Irgendwie war es langweilig heute",
      ),
      createNewPollAnswerWithoutDB("Ruhe. Es war viel zu laut"),
      createNewPollAnswerWithoutDB(
        "Feedback. Ich brauche mehr Rückmeldung zu meiner Arbeit",
      ),
    ]),
  });
}
export function getGradeMeTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([
          Text.create("Wie würdest du die Stunde in Schulnoten bewerten?"),
        ]),
      }),
      createNewPollAnswerWithoutDB("1"),
      createNewPollAnswerWithoutDB("2"),
      createNewPollAnswerWithoutDB("3"),
      createNewPollAnswerWithoutDB("4"),
      createNewPollAnswerWithoutDB("5"),
      createNewPollAnswerWithoutDB("6"),
    ]),
  });
}

export function getEmptyTemplate() {
  return Block.create({
    type: "poll",
    nodes: List([
      Block.create({
        type: "poll_question",
        nodes: List([Text.create("")]),
      }),
      createNewPollAnswerWithoutDB(""),
      createNewPollAnswerWithoutDB(""),
    ]),
  });
}
