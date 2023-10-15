/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSquadron = /* GraphQL */ `
  query GetSquadron($id: ID!) {
    getSquadron(id: $id) {
      id
      Squads {
        nextToken
        __typename
      }
      Users {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSquadrons = /* GraphQL */ `
  query ListSquadrons(
    $filter: ModelSquadronFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadrons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPollComments = /* GraphQL */ `
  query GetPollComments($id: ID!) {
    getPollComments(id: $id) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      pollCommentsUserId
      __typename
    }
  }
`;
export const listPollComments = /* GraphQL */ `
  query ListPollComments(
    $filter: ModelPollCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollresponseID
        createdAt
        updatedAt
        pollCommentsUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPollResponse = /* GraphQL */ `
  query GetPollResponse($id: ID!) {
    getPollResponse(id: $id) {
      id
      Poll {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      createdAt
      updatedAt
      pollResponsePollId
      __typename
    }
  }
`;
export const listPollResponses = /* GraphQL */ `
  query ListPollResponses(
    $filter: ModelPollResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
      id
      Polls {
        nextToken
        __typename
      }
      latestPoll {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      adminUser
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      squadronID
      createdAt
      updatedAt
      squadLatestPollId
      squadUserId
      __typename
    }
  }
`;
export const listSquads = /* GraphQL */ `
  query ListSquads(
    $filter: ModelSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
        squadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      id
      pollCaption
      pollMedia
      squadID
      userID
      livePoll
      closedPoll
      PollResponse {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      createdAt
      updatedAt
      pollPollResponseId
      __typename
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      userName
      imageUrl
      Polls {
        nextToken
        __typename
      }
      numOfPolls
      numOfSquadron
      Squad {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
        squadUserId
        __typename
      }
      squadrons {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userSquadId
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSquadronUser = /* GraphQL */ `
  query GetSquadronUser($id: ID!) {
    getSquadronUser(id: $id) {
      id
      squadronId
      userId
      squadron {
        id
        createdAt
        updatedAt
        __typename
      }
      user {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSquadronUsers = /* GraphQL */ `
  query ListSquadronUsers(
    $filter: ModelSquadronUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadronUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        squadronId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByPollresponseID = /* GraphQL */ `
  query PollCommentsByPollresponseID(
    $pollresponseID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByPollresponseID(
      pollresponseID: $pollresponseID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollresponseID
        createdAt
        updatedAt
        pollCommentsUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadsBySquadronID = /* GraphQL */ `
  query SquadsBySquadronID(
    $squadronID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadsBySquadronID(
      squadronID: $squadronID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
        squadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollsBySquadID = /* GraphQL */ `
  query PollsBySquadID(
    $squadID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollsBySquadID(
      squadID: $squadID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollsByUserID = /* GraphQL */ `
  query PollsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadronUsersBySquadronId = /* GraphQL */ `
  query SquadronUsersBySquadronId(
    $squadronId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadronUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadronUsersBySquadronId(
      squadronId: $squadronId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadronId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadronUsersByUserId = /* GraphQL */ `
  query SquadronUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadronUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadronUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadronId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
