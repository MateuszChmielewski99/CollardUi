export type RecommendMoviesRequest = {
  userId: string;
  algorithm: string;
  distance: string;
  divideByFirst: boolean;
  divideBySecond: boolean;
  divideByThird: boolean;
  groupNumber: number;
  normalizeData: boolean;
};
