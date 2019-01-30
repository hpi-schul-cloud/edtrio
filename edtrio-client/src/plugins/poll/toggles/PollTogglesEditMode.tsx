import PollToggles from "./PollToggles";

export default class PollTogglesEditMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse sofort freischalten";
    } else {
      return "Ergebnisse nicht sofort freischalten";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (votingAllowed) {
      return "Abstimmen sofort freischalten";
    } else {
      return "Abstimmen nicht sofort freischalten";
    }
  }
}
