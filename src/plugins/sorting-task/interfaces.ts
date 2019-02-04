export interface ILearningItems extends Array<ILearningItem> {};
export interface ILearningItem {
  term: string,
  description?: string,
};

export interface IFlashCards extends Array<IFlashCard> {};
export interface IFlashCard {
  learningItem: ILearningItem,
  isSolved: boolean,
  isFlipped: boolean,
};