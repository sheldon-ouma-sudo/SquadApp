/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
      imageUrl
      numOfPolls
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
      createdAt
      updatedAt
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
        username
        imageUrl
        numOfPolls
        interests
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
      id
      users {
        nextToken
      }
      polls {
        nextToken
      }
      createdAt
      updatedAt
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
      }
      nextToken
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      id
      caption
      images
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        createdAt
        updatedAt
      }
      category
      updatedAt
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
        caption
        images
        createdAt
        userID
        category
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserSquad = /* GraphQL */ `
  query GetUserSquad($id: ID!) {
    getUserSquad(id: $id) {
      id
      userId
      squadId
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        createdAt
        updatedAt
      }
      squad {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        userId
        squadId
        createdAt
        updatedAt
      }
      nextToken
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
        caption
        images
        createdAt
        userID
        category
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPollsBySquad = /* GraphQL */ `
  query ListPollsBySquad(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollsBySquad(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        caption
        images
        createdAt
        userID
        category
        updatedAt
      }
      nextToken
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
        userId
        squadId
        createdAt
        updatedAt
      }
      nextToken
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
        userId
        squadId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
