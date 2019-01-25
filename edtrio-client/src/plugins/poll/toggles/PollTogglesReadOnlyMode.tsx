import PollToggles from "./PollToggles";

export default class PollTogglesReadOnlyMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse freigeschaltet";
    } else {
      return "Ergebnisse nicht sichtbar";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (votingAllowed) {
      return "Nutzer dürfen nicht abstimmen";
    } else {
      return "Nutzer dürfen abstimmen";
    }
  }
}
