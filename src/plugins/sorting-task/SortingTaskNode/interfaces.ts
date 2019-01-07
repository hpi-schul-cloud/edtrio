export interface ILearningItems extends Array<ILearningItem> {};
export interface ILearningItem {
  term: string,
  description?: string,
};