/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSquadron = /* GraphQL */ `
  query GetSquadron($id: ID!) {
    getSquadron(id: $id) {
      id
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
export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
      id
      adminUser
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
        squadUserId
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
      userSquadId
      numOfPolls
      numOfSquadron
      Squad {
        id
        adminUser
        createdAt
        updatedAt
        squadUserId
        __typename
      }
      squadrons {
        nextToken
        __typename
      }
      userInterests
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
        userSquadId
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
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
        userSquadId
        numOfPolls
        numOfSquadron
        userInterests
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
