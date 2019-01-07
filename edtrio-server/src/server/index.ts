import { mutations } from "./mutations";
import { queries } from "./queries";
import { subscriptions } from "./subscriptions";

export const resolvers = {
  ...queries,
  ...mutations,
  ...subscriptions,
};
