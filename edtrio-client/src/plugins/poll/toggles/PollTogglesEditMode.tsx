import PollToggles from "./PollToggles";

export default class PollTogglesEditMode extends PollToggles {
  protected getResultsLabel(displayResults: boolean) {
    if (displayResults) {
      return "Ergebnisse sofort anzeigen";
    } else {
      return "Ergebnisse manuell anzeigen";
    }
  }
  protected getVoteLabel(votingAllowed: boolean) {
    if (!votingAllowed) {
      return "Abstimmen manuell freischlaten";
    } else {
      return "Abstimmen sofort freischlaten";
    }
  }
}
