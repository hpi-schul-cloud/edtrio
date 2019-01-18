import { mutations } from "./mutations";
import { queries } from "./queries";
import { subscriptions } from "./subscriptions";
import { typeResolvers } from "./typeResolvers";

export const resolvers = {
  ...queries,
  ...mutations,
  ...subscriptions,
  ...typeResolvers,
};
