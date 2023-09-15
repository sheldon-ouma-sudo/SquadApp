/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
      id
      Polls {
        nextToken
        __typename
      }
      users {
        nextToken
        __typename
      }
      latestPoll {
        id
        pollCaption
        pollMedia
        squadID
        userID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      squadLatestPollId
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
        createdAt
        updatedAt
        squadLatestPollId
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
      Squads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserSquad = /* GraphQL */ `
  query GetUserSquad($id: ID!) {
    getUserSquad(id: $id) {
      id
      squadId
      userId
      squad {
        id
        createdAt
        updatedAt
        squadLatestPollId
        __typename
      }
      user {
        id
        name
        userName
        imageUrl
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserSquads = /* GraphQL */ `
  query ListUserSquads(
    $filter: ModelUserSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSquads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        squadId
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
export const userSquadsBySquadId = /* GraphQL */ `
  query UserSquadsBySquadId(
    $squadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSquadsBySquadId(
      squadId: $squadId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadId
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
export const userSquadsByUserId = /* GraphQL */ `
  query UserSquadsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSquadsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadId
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
