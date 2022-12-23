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
        id
        createdAt
        updatedAt
      }
      polls {
        nextToken
      }
      createdAt
      updatedAt
      squadUserUsersId
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
        createdAt
        updatedAt
        squadUserUsersId
      }
      nextToken
    }
  }
`;
export const getSquadUser = /* GraphQL */ `
  query GetSquadUser($id: ID!) {
    getSquadUser(id: $id) {
      id
      userID
      squadID
      users {
        nextToken
      }
      createdAt
      updatedAt
      squadSquadUsersId
    }
  }
`;
export const listSquadUsers = /* GraphQL */ `
  query ListSquadUsers(
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        squadID
        createdAt
        updatedAt
        squadSquadUsersId
      }
      nextToken
    }
  }
`;
export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
      id
      SquadUsers {
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
        createdAt
        updatedAt
        squadUserUsersId
      }
      createdAt
      userID
      squadID
      squad {
        id
        createdAt
        updatedAt
      }
      category
      updatedAt
      userPollsId
      squadPollsId
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
        squadID
        category
        updatedAt
        userPollsId
        squadPollsId
      }
      nextToken
    }
  }
`;
