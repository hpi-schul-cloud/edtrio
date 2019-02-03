import { createContext } from "react";

export interface IPollStateProviderState {
  id: string;
  answers: any;
  votingAllowed: boolean;
  updateVotingAllowed: (votingAllowed: boolean) => void;
  displayResults: boolean;
  updateDisplayResults: (displayResults: boolean) => void;
  selectedAnswer: string;
  updateSelectedAnswer: (selectedAnswer: string) => void;
  getUsersWhoHaveVoted: () => string[];
  getAnswerInformation: (pollAnswerId: string) => any;
  getTotalVotes: () => number;
  initState: (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
    currentUser: any,
  ) => void;
}

export const PollStateContext = createContext<IPollStateProviderState>({
  id: "",
  answers: [],
  votingAllowed: false,
  updateVotingAllowed: (votingAllowed: boolean) => {},
  displayResults: false,
  updateDisplayResults: (displayResults: boolean) => {},
  selectedAnswer: "",
  updateSelectedAnswer: (selectedAnswer: string) => {},
  getUsersWhoHaveVoted: () => [],
  getAnswerInformation: (pollAnswerId: string) => ({
    votesCount: Number,
    isLeading: Boolean,
  }),
  getTotalVotes: () => Number(),
  initState: (
    id: string,
    votingAllowed: boolean,
    displayResults: boolean,
    answers: any,
    currentUser: any,
  ) => {},
});
