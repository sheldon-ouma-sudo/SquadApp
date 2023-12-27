/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPollComment = /* GraphQL */ `
  query GetPollComment($id: ID!) {
    getPollComment(id: $id) {
      id
      pollID
      userID
      numOfLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPollComments = /* GraphQL */ `
  query ListPollComments(
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollID
        userID
        numOfLikes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByPollID = /* GraphQL */ `
  query PollCommentsByPollID(
    $pollID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByPollID(
      pollID: $pollID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByUserID = /* GraphQL */ `
  query PollCommentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        createdAt
        updatedAt
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
      totalNumOfVotes
      pollMedia
      closed
      open
      userID
      numOfLikes
      pollAudience
      squadID
      pollCaption
      pollLabel
      pollScore
      pollItems
      PollComments {
        nextToken
        __typename
      }
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
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        squadID
        pollCaption
        pollLabel
        pollScore
        pollItems
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
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        squadID
        pollCaption
        pollLabel
        pollScore
        pollItems
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
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        squadID
        pollCaption
        pollLabel
        pollScore
        pollItems
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
      Users {
        nextToken
        __typename
      }
      authUserID
      squadName
      numOfPolls
      Polls {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
        authUserID
        squadName
        numOfPolls
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squads {
        nextToken
        __typename
      }
      Polls {
        nextToken
        __typename
      }
      PollComments {
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
export const getSquadUser = /* GraphQL */ `
  query GetSquadUser($id: ID!) {
    getSquadUser(id: $id) {
      id
      squadId
      userId
      squad {
        id
        authUserID
        squadName
        numOfPolls
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
export const listSquadUsers = /* GraphQL */ `
  query ListSquadUsers(
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const squadUsersBySquadId = /* GraphQL */ `
  query SquadUsersBySquadId(
    $squadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadUsersBySquadId(
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
export const squadUsersByUserId = /* GraphQL */ `
  query SquadUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadUsersByUserId(
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
