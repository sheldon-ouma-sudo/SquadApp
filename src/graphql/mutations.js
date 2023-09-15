/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSquad = /* GraphQL */ `
  mutation CreateSquad(
    $input: CreateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    createSquad(input: $input, condition: $condition) {
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
export const updateSquad = /* GraphQL */ `
  mutation UpdateSquad(
    $input: UpdateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    updateSquad(input: $input, condition: $condition) {
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
export const deleteSquad = /* GraphQL */ `
  mutation DeleteSquad(
    $input: DeleteSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    deleteSquad(input: $input, condition: $condition) {
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
export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserSquad = /* GraphQL */ `
  mutation CreateUserSquad(
    $input: CreateUserSquadInput!
    $condition: ModelUserSquadConditionInput
  ) {
    createUserSquad(input: $input, condition: $condition) {
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
export const updateUserSquad = /* GraphQL */ `
  mutation UpdateUserSquad(
    $input: UpdateUserSquadInput!
    $condition: ModelUserSquadConditionInput
  ) {
    updateUserSquad(input: $input, condition: $condition) {
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
export const deleteUserSquad = /* GraphQL */ `
  mutation DeleteUserSquad(
    $input: DeleteUserSquadInput!
    $condition: ModelUserSquadConditionInput
  ) {
    deleteUserSquad(input: $input, condition: $condition) {
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
