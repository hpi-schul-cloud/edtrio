import { Subscription } from "react-apollo";
import {
  pollChanged,
  pollChangedVariables,
} from "../../graphqlOperations/generated-types/pollChanged";

export class PollSubscription extends Subscription<
  pollChanged,
  pollChangedVariables
> {}
