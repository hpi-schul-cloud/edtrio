import PollToggles from "./PollToggles";

export default class PollTogglesReadOnlyMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse für Schüler nach Abstimmen sichtbar";
    } else {
      return "Ergebnisse für Schüler nicht sichtbar";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (votingAllowed) {
      return "Schüler dürfen abstimmen";
    } else {
      return "Schüler dürfen nicht abstimmen";
    }
  }
}
