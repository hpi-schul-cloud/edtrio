export interface ILearningItems extends Array<ILearningItem> {};
export interface ILearningItem {
  term: string,
  description?: string,
};
export interface ILearningItemsWithKnownState extends Array<ILearningItemWithKnownState> {};
export interface ILearningItemWithKnownState {
  term: string,
  description?: string,
  isSolved: boolean,
  wasViewed: boolean
};