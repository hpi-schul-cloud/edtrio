export const typeDefs = /* GraphQL */ `type AggregateDocument {
  count: Int!
}

type AggregateMultipleChoiceAnswer {
  count: Int!
}

type AggregateMultipleChoiceSubmission {
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
  value: Json!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  createdAt: DateTime!
  updatedAt: DateTime!
  answers(where: MultipleChoiceAnswerWhereInput, orderBy: MultipleChoiceAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MultipleChoiceAnswer!]
}

type DocumentConnection {
  pageInfo: PageInfo!
  edges: [DocumentEdge]!
  aggregate: AggregateDocument!
}

input DocumentCreateInput {
  value: Json!
  users: UserCreateManyInput
  answers: MultipleChoiceAnswerCreateManyInput
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
  value: Json!
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
  value: Json
  users: UserUpdateManyInput
  answers: MultipleChoiceAnswerUpdateManyInput
}

input DocumentUpdateManyMutationInput {
  value: Json
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
  answers_every: MultipleChoiceAnswerWhereInput
  answers_some: MultipleChoiceAnswerWhereInput
  answers_none: MultipleChoiceAnswerWhereInput
  AND: [DocumentWhereInput!]
  OR: [DocumentWhereInput!]
  NOT: [DocumentWhereInput!]
}

input DocumentWhereUniqueInput {
  id: ID
}

scalar Json

scalar Long

type MultipleChoiceAnswer {
  id: ID!
  isCorrect: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  multipleChoiceSubmissions(where: MultipleChoiceSubmissionWhereInput, orderBy: MultipleChoiceSubmissionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MultipleChoiceSubmission!]
}

type MultipleChoiceAnswerConnection {
  pageInfo: PageInfo!
  edges: [MultipleChoiceAnswerEdge]!
  aggregate: AggregateMultipleChoiceAnswer!
}

input MultipleChoiceAnswerCreateInput {
  isCorrect: Boolean!
  multipleChoiceSubmissions: MultipleChoiceSubmissionCreateManyInput
}

input MultipleChoiceAnswerCreateManyInput {
  create: [MultipleChoiceAnswerCreateInput!]
  connect: [MultipleChoiceAnswerWhereUniqueInput!]
}

type MultipleChoiceAnswerEdge {
  node: MultipleChoiceAnswer!
  cursor: String!
}

enum MultipleChoiceAnswerOrderByInput {
  id_ASC
  id_DESC
  isCorrect_ASC
  isCorrect_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MultipleChoiceAnswerPreviousValues {
  id: ID!
  isCorrect: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input MultipleChoiceAnswerScalarWhereInput {
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
  isCorrect: Boolean
  isCorrect_not: Boolean
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
  AND: [MultipleChoiceAnswerScalarWhereInput!]
  OR: [MultipleChoiceAnswerScalarWhereInput!]
  NOT: [MultipleChoiceAnswerScalarWhereInput!]
}

type MultipleChoiceAnswerSubscriptionPayload {
  mutation: MutationType!
  node: MultipleChoiceAnswer
  updatedFields: [String!]
  previousValues: MultipleChoiceAnswerPreviousValues
}

input MultipleChoiceAnswerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MultipleChoiceAnswerWhereInput
  AND: [MultipleChoiceAnswerSubscriptionWhereInput!]
  OR: [MultipleChoiceAnswerSubscriptionWhereInput!]
  NOT: [MultipleChoiceAnswerSubscriptionWhereInput!]
}

input MultipleChoiceAnswerUpdateDataInput {
  isCorrect: Boolean
  multipleChoiceSubmissions: MultipleChoiceSubmissionUpdateManyInput
}

input MultipleChoiceAnswerUpdateInput {
  isCorrect: Boolean
  multipleChoiceSubmissions: MultipleChoiceSubmissionUpdateManyInput
}

input MultipleChoiceAnswerUpdateManyDataInput {
  isCorrect: Boolean
}

input MultipleChoiceAnswerUpdateManyInput {
  create: [MultipleChoiceAnswerCreateInput!]
  update: [MultipleChoiceAnswerUpdateWithWhereUniqueNestedInput!]
  upsert: [MultipleChoiceAnswerUpsertWithWhereUniqueNestedInput!]
  delete: [MultipleChoiceAnswerWhereUniqueInput!]
  connect: [MultipleChoiceAnswerWhereUniqueInput!]
  disconnect: [MultipleChoiceAnswerWhereUniqueInput!]
  deleteMany: [MultipleChoiceAnswerScalarWhereInput!]
  updateMany: [MultipleChoiceAnswerUpdateManyWithWhereNestedInput!]
}

input MultipleChoiceAnswerUpdateManyMutationInput {
  isCorrect: Boolean
}

input MultipleChoiceAnswerUpdateManyWithWhereNestedInput {
  where: MultipleChoiceAnswerScalarWhereInput!
  data: MultipleChoiceAnswerUpdateManyDataInput!
}

input MultipleChoiceAnswerUpdateWithWhereUniqueNestedInput {
  where: MultipleChoiceAnswerWhereUniqueInput!
  data: MultipleChoiceAnswerUpdateDataInput!
}

input MultipleChoiceAnswerUpsertWithWhereUniqueNestedInput {
  where: MultipleChoiceAnswerWhereUniqueInput!
  update: MultipleChoiceAnswerUpdateDataInput!
  create: MultipleChoiceAnswerCreateInput!
}

input MultipleChoiceAnswerWhereInput {
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
  isCorrect: Boolean
  isCorrect_not: Boolean
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
  multipleChoiceSubmissions_every: MultipleChoiceSubmissionWhereInput
  multipleChoiceSubmissions_some: MultipleChoiceSubmissionWhereInput
  multipleChoiceSubmissions_none: MultipleChoiceSubmissionWhereInput
  AND: [MultipleChoiceAnswerWhereInput!]
  OR: [MultipleChoiceAnswerWhereInput!]
  NOT: [MultipleChoiceAnswerWhereInput!]
}

input MultipleChoiceAnswerWhereUniqueInput {
  id: ID
}

type MultipleChoiceSubmission {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  author: User!
  isChecked: Boolean!
}

type MultipleChoiceSubmissionConnection {
  pageInfo: PageInfo!
  edges: [MultipleChoiceSubmissionEdge]!
  aggregate: AggregateMultipleChoiceSubmission!
}

input MultipleChoiceSubmissionCreateInput {
  author: UserCreateOneInput!
  isChecked: Boolean!
}

input MultipleChoiceSubmissionCreateManyInput {
  create: [MultipleChoiceSubmissionCreateInput!]
  connect: [MultipleChoiceSubmissionWhereUniqueInput!]
}

type MultipleChoiceSubmissionEdge {
  node: MultipleChoiceSubmission!
  cursor: String!
}

enum MultipleChoiceSubmissionOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  isChecked_ASC
  isChecked_DESC
}

type MultipleChoiceSubmissionPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isChecked: Boolean!
}

input MultipleChoiceSubmissionScalarWhereInput {
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
  isChecked: Boolean
  isChecked_not: Boolean
  AND: [MultipleChoiceSubmissionScalarWhereInput!]
  OR: [MultipleChoiceSubmissionScalarWhereInput!]
  NOT: [MultipleChoiceSubmissionScalarWhereInput!]
}

type MultipleChoiceSubmissionSubscriptionPayload {
  mutation: MutationType!
  node: MultipleChoiceSubmission
  updatedFields: [String!]
  previousValues: MultipleChoiceSubmissionPreviousValues
}

input MultipleChoiceSubmissionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MultipleChoiceSubmissionWhereInput
  AND: [MultipleChoiceSubmissionSubscriptionWhereInput!]
  OR: [MultipleChoiceSubmissionSubscriptionWhereInput!]
  NOT: [MultipleChoiceSubmissionSubscriptionWhereInput!]
}

input MultipleChoiceSubmissionUpdateDataInput {
  author: UserUpdateOneRequiredInput
  isChecked: Boolean
}

input MultipleChoiceSubmissionUpdateInput {
  author: UserUpdateOneRequiredInput
  isChecked: Boolean
}

input MultipleChoiceSubmissionUpdateManyDataInput {
  isChecked: Boolean
}

input MultipleChoiceSubmissionUpdateManyInput {
  create: [MultipleChoiceSubmissionCreateInput!]
  update: [MultipleChoiceSubmissionUpdateWithWhereUniqueNestedInput!]
  upsert: [MultipleChoiceSubmissionUpsertWithWhereUniqueNestedInput!]
  delete: [MultipleChoiceSubmissionWhereUniqueInput!]
  connect: [MultipleChoiceSubmissionWhereUniqueInput!]
  disconnect: [MultipleChoiceSubmissionWhereUniqueInput!]
  deleteMany: [MultipleChoiceSubmissionScalarWhereInput!]
  updateMany: [MultipleChoiceSubmissionUpdateManyWithWhereNestedInput!]
}

input MultipleChoiceSubmissionUpdateManyMutationInput {
  isChecked: Boolean
}

input MultipleChoiceSubmissionUpdateManyWithWhereNestedInput {
  where: MultipleChoiceSubmissionScalarWhereInput!
  data: MultipleChoiceSubmissionUpdateManyDataInput!
}

input MultipleChoiceSubmissionUpdateWithWhereUniqueNestedInput {
  where: MultipleChoiceSubmissionWhereUniqueInput!
  data: MultipleChoiceSubmissionUpdateDataInput!
}

input MultipleChoiceSubmissionUpsertWithWhereUniqueNestedInput {
  where: MultipleChoiceSubmissionWhereUniqueInput!
  update: MultipleChoiceSubmissionUpdateDataInput!
  create: MultipleChoiceSubmissionCreateInput!
}

input MultipleChoiceSubmissionWhereInput {
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
  author: UserWhereInput
  isChecked: Boolean
  isChecked_not: Boolean
  AND: [MultipleChoiceSubmissionWhereInput!]
  OR: [MultipleChoiceSubmissionWhereInput!]
  NOT: [MultipleChoiceSubmissionWhereInput!]
}

input MultipleChoiceSubmissionWhereUniqueInput {
  id: ID
}

type Mutation {
  createDocument(data: DocumentCreateInput!): Document!
  updateDocument(data: DocumentUpdateInput!, where: DocumentWhereUniqueInput!): Document
  updateManyDocuments(data: DocumentUpdateManyMutationInput!, where: DocumentWhereInput): BatchPayload!
  upsertDocument(where: DocumentWhereUniqueInput!, create: DocumentCreateInput!, update: DocumentUpdateInput!): Document!
  deleteDocument(where: DocumentWhereUniqueInput!): Document
  deleteManyDocuments(where: DocumentWhereInput): BatchPayload!
  createMultipleChoiceAnswer(data: MultipleChoiceAnswerCreateInput!): MultipleChoiceAnswer!
  updateMultipleChoiceAnswer(data: MultipleChoiceAnswerUpdateInput!, where: MultipleChoiceAnswerWhereUniqueInput!): MultipleChoiceAnswer
  updateManyMultipleChoiceAnswers(data: MultipleChoiceAnswerUpdateManyMutationInput!, where: MultipleChoiceAnswerWhereInput): BatchPayload!
  upsertMultipleChoiceAnswer(where: MultipleChoiceAnswerWhereUniqueInput!, create: MultipleChoiceAnswerCreateInput!, update: MultipleChoiceAnswerUpdateInput!): MultipleChoiceAnswer!
  deleteMultipleChoiceAnswer(where: MultipleChoiceAnswerWhereUniqueInput!): MultipleChoiceAnswer
  deleteManyMultipleChoiceAnswers(where: MultipleChoiceAnswerWhereInput): BatchPayload!
  createMultipleChoiceSubmission(data: MultipleChoiceSubmissionCreateInput!): MultipleChoiceSubmission!
  updateMultipleChoiceSubmission(data: MultipleChoiceSubmissionUpdateInput!, where: MultipleChoiceSubmissionWhereUniqueInput!): MultipleChoiceSubmission
  updateManyMultipleChoiceSubmissions(data: MultipleChoiceSubmissionUpdateManyMutationInput!, where: MultipleChoiceSubmissionWhereInput): BatchPayload!
  upsertMultipleChoiceSubmission(where: MultipleChoiceSubmissionWhereUniqueInput!, create: MultipleChoiceSubmissionCreateInput!, update: MultipleChoiceSubmissionUpdateInput!): MultipleChoiceSubmission!
  deleteMultipleChoiceSubmission(where: MultipleChoiceSubmissionWhereUniqueInput!): MultipleChoiceSubmission
  deleteManyMultipleChoiceSubmissions(where: MultipleChoiceSubmissionWhereInput): BatchPayload!
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
  multipleChoiceAnswer(where: MultipleChoiceAnswerWhereUniqueInput!): MultipleChoiceAnswer
  multipleChoiceAnswers(where: MultipleChoiceAnswerWhereInput, orderBy: MultipleChoiceAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MultipleChoiceAnswer]!
  multipleChoiceAnswersConnection(where: MultipleChoiceAnswerWhereInput, orderBy: MultipleChoiceAnswerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MultipleChoiceAnswerConnection!
  multipleChoiceSubmission(where: MultipleChoiceSubmissionWhereUniqueInput!): MultipleChoiceSubmission
  multipleChoiceSubmissions(where: MultipleChoiceSubmissionWhereInput, orderBy: MultipleChoiceSubmissionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MultipleChoiceSubmission]!
  multipleChoiceSubmissionsConnection(where: MultipleChoiceSubmissionWhereInput, orderBy: MultipleChoiceSubmissionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MultipleChoiceSubmissionConnection!
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
  multipleChoiceAnswer(where: MultipleChoiceAnswerSubscriptionWhereInput): MultipleChoiceAnswerSubscriptionPayload
  multipleChoiceSubmission(where: MultipleChoiceSubmissionSubscriptionWhereInput): MultipleChoiceSubmissionSubscriptionPayload
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

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
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

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
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