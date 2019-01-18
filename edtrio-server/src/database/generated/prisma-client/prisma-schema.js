module.exports = {
        typeDefs: /* GraphQL */ `type AggregateDocument {
  count: Int!
}

type AggregatePoll {
  count: Int!
}

type AggregatePollAnswer {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Document {
  id: ID!
  value: String!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentConnection {
  pageInfo: PageInfo!
  edges: [DocumentEdge]!
  aggregate: AggregateDocument!
}

input DocumentCreateInput {
  value: String!
  users: UserCreateManyInput
}

type DocumentEdge {
  node: Document!
  cursor: String!
}

enum DocumentOrderByInput {
  id_ASC
  id_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DocumentPreviousValues {
  id: ID!
  value: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentSubscriptionPayload {
  mutation: MutationType!
  node: Document
  updatedFields: [String!]
  previousValues: DocumentPreviousValues
}

input DocumentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DocumentWhereInput
  AND: [DocumentSubscriptionWhereInput!]
  OR: [DocumentSubscriptionWhereInput!]
  NOT: [DocumentSubscriptionWhereInput!]
}

input DocumentUpdateInput {
  value: String
  users: UserUpdateManyInput
}

input DocumentUpdateManyMutationInput {
  value: String
}

input DocumentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [DocumentWhereInput!]
  OR: [DocumentWhereInput!]
  NOT: [DocumentWhereInput!]
}

input DocumentWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createDocument(data: DocumentCreateInput!): Document!
  updateDocument(data: DocumentUpdateInput!, where: DocumentWhereUniqueInput!): Document
  updateManyDocuments(data: DocumentUpdateManyMutationInput!, where: DocumentWhereInput): BatchPayload!
  upsertDocument(where: DocumentWhereUniqueInput!, create: DocumentCreateInput!, update: DocumentUpdateInput!): Document!
  deleteDocument(where: DocumentWhereUniqueInput!): Document
  deleteManyDocuments(where: DocumentWhereInput): BatchPayload!
  createPoll(data: PollCreateInput!): Poll!
  updatePoll(data: PollUpdateInput!, where: PollWhereUniqueInput!): Poll
  updateManyPolls(data: PollUpdateManyMutationInput!, where: PollWhereInput): BatchPayload!
  upsertPoll(where: PollWhereUniqueInput!, create: PollCreateInput!, update: PollUpdateInput!): Poll!
  deletePoll(where: PollWhereUniqueInput!): Poll
  deleteManyPolls(where: PollWhereInput): BatchPayload!
  createPollAnswer(data: PollAnswerCreateInput!): PollAnswer!
  updatePollAnswer(data: PollAnswerUpdateInput!, where: PollAnswerWhereUniqueInput!): PollAnswer
  upsertPollAnswer(where: PollAnswerWhereUniqueInput!, create: PollAnswerCreateInput!, update: PollAnswerUpdateInput!): PollAnswer!
  deletePollAnswer(where: PollAnswerWhereUniqueInput!): PollAnswer
  deleteManyPollAnswers(where: PollAnswerWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Poll {
  id: ID!
  votingAllowed: Boolean!
  displayResults: Boolean!
  answers(where: PollAnswerWhereInput, orderBy: PollAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PollAnswer!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PollAnswer {
  id: ID!
  votes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  poll: Poll!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PollAnswerConnection {
  pageInfo: PageInfo!
  edges: [PollAnswerEdge]!
  aggregate: AggregatePollAnswer!
}

input PollAnswerCreateInput {
  votes: UserCreateManyInput
  poll: PollCreateOneWithoutAnswersInput!
}

input PollAnswerCreateManyWithoutPollInput {
  create: [PollAnswerCreateWithoutPollInput!]
  connect: [PollAnswerWhereUniqueInput!]
}

input PollAnswerCreateWithoutPollInput {
  votes: UserCreateManyInput
}

type PollAnswerEdge {
  node: PollAnswer!
  cursor: String!
}

enum PollAnswerOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PollAnswerPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input PollAnswerScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PollAnswerScalarWhereInput!]
  OR: [PollAnswerScalarWhereInput!]
  NOT: [PollAnswerScalarWhereInput!]
}

type PollAnswerSubscriptionPayload {
  mutation: MutationType!
  node: PollAnswer
  updatedFields: [String!]
  previousValues: PollAnswerPreviousValues
}

input PollAnswerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PollAnswerWhereInput
  AND: [PollAnswerSubscriptionWhereInput!]
  OR: [PollAnswerSubscriptionWhereInput!]
  NOT: [PollAnswerSubscriptionWhereInput!]
}

input PollAnswerUpdateInput {
  votes: UserUpdateManyInput
  poll: PollUpdateOneRequiredWithoutAnswersInput
}

input PollAnswerUpdateManyWithoutPollInput {
  create: [PollAnswerCreateWithoutPollInput!]
  delete: [PollAnswerWhereUniqueInput!]
  connect: [PollAnswerWhereUniqueInput!]
  disconnect: [PollAnswerWhereUniqueInput!]
  update: [PollAnswerUpdateWithWhereUniqueWithoutPollInput!]
  upsert: [PollAnswerUpsertWithWhereUniqueWithoutPollInput!]
  deleteMany: [PollAnswerScalarWhereInput!]
}

input PollAnswerUpdateWithoutPollDataInput {
  votes: UserUpdateManyInput
}

input PollAnswerUpdateWithWhereUniqueWithoutPollInput {
  where: PollAnswerWhereUniqueInput!
  data: PollAnswerUpdateWithoutPollDataInput!
}

input PollAnswerUpsertWithWhereUniqueWithoutPollInput {
  where: PollAnswerWhereUniqueInput!
  update: PollAnswerUpdateWithoutPollDataInput!
  create: PollAnswerCreateWithoutPollInput!
}

input PollAnswerWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  votes_every: UserWhereInput
  votes_some: UserWhereInput
  votes_none: UserWhereInput
  poll: PollWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PollAnswerWhereInput!]
  OR: [PollAnswerWhereInput!]
  NOT: [PollAnswerWhereInput!]
}

input PollAnswerWhereUniqueInput {
  id: ID
}

type PollConnection {
  pageInfo: PageInfo!
  edges: [PollEdge]!
  aggregate: AggregatePoll!
}

input PollCreateInput {
  votingAllowed: Boolean!
  displayResults: Boolean!
  answers: PollAnswerCreateManyWithoutPollInput
}

input PollCreateOneWithoutAnswersInput {
  create: PollCreateWithoutAnswersInput
  connect: PollWhereUniqueInput
}

input PollCreateWithoutAnswersInput {
  votingAllowed: Boolean!
  displayResults: Boolean!
}

type PollEdge {
  node: Poll!
  cursor: String!
}

enum PollOrderByInput {
  id_ASC
  id_DESC
  votingAllowed_ASC
  votingAllowed_DESC
  displayResults_ASC
  displayResults_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PollPreviousValues {
  id: ID!
  votingAllowed: Boolean!
  displayResults: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PollSubscriptionPayload {
  mutation: MutationType!
  node: Poll
  updatedFields: [String!]
  previousValues: PollPreviousValues
}

input PollSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PollWhereInput
  AND: [PollSubscriptionWhereInput!]
  OR: [PollSubscriptionWhereInput!]
  NOT: [PollSubscriptionWhereInput!]
}

input PollUpdateInput {
  votingAllowed: Boolean
  displayResults: Boolean
  answers: PollAnswerUpdateManyWithoutPollInput
}

input PollUpdateManyMutationInput {
  votingAllowed: Boolean
  displayResults: Boolean
}

input PollUpdateOneRequiredWithoutAnswersInput {
  create: PollCreateWithoutAnswersInput
  update: PollUpdateWithoutAnswersDataInput
  upsert: PollUpsertWithoutAnswersInput
  connect: PollWhereUniqueInput
}

input PollUpdateWithoutAnswersDataInput {
  votingAllowed: Boolean
  displayResults: Boolean
}

input PollUpsertWithoutAnswersInput {
  update: PollUpdateWithoutAnswersDataInput!
  create: PollCreateWithoutAnswersInput!
}

input PollWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  votingAllowed: Boolean
  votingAllowed_not: Boolean
  displayResults: Boolean
  displayResults_not: Boolean
  answers_every: PollAnswerWhereInput
  answers_some: PollAnswerWhereInput
  answers_none: PollAnswerWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [PollWhereInput!]
  OR: [PollWhereInput!]
  NOT: [PollWhereInput!]
}

input PollWhereUniqueInput {
  id: ID
}

type Query {
  document(where: DocumentWhereUniqueInput!): Document
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document]!
  documentsConnection(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DocumentConnection!
  poll(where: PollWhereUniqueInput!): Poll
  polls(where: PollWhereInput, orderBy: PollOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Poll]!
  pollsConnection(where: PollWhereInput, orderBy: PollOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PollConnection!
  pollAnswer(where: PollAnswerWhereUniqueInput!): PollAnswer
  pollAnswers(where: PollAnswerWhereInput, orderBy: PollAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PollAnswer]!
  pollAnswersConnection(where: PollAnswerWhereInput, orderBy: PollAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PollAnswerConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  document(where: DocumentSubscriptionWhereInput): DocumentSubscriptionPayload
  poll(where: PollSubscriptionWhereInput): PollSubscriptionPayload
  pollAnswer(where: PollAnswerSubscriptionWhereInput): PollAnswerSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  isTeacher: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  isTeacher: Boolean!
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  isTeacher_ASC
  isTeacher_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  isTeacher: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  isTeacher: Boolean
  isTeacher_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  name: String
  isTeacher: Boolean
}

input UserUpdateInput {
  name: String
  isTeacher: Boolean
}

input UserUpdateManyDataInput {
  name: String
  isTeacher: Boolean
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  name: String
  isTeacher: Boolean
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  isTeacher: Boolean
  isTeacher_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    