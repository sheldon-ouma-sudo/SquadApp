/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      username
      imageUrl
      numOfPolls
      createdAt
      updatedAt
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
      username
      imageUrl
      numOfPolls
      createdAt
      updatedAt
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
      username
      imageUrl
      numOfPolls
      createdAt
      updatedAt
    }
  }
`;
export const createSquadUser = /* GraphQL */ `
  mutation CreateSquadUser(
    $input: CreateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    createSquadUser(input: $input, condition: $condition) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const updateSquadUser = /* GraphQL */ `
  mutation UpdateSquadUser(
    $input: UpdateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    updateSquadUser(input: $input, condition: $condition) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const deleteSquadUser = /* GraphQL */ `
  mutation DeleteSquadUser(
    $input: DeleteSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    deleteSquadUser(input: $input, condition: $condition) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const createSquad = /* GraphQL */ `
  mutation CreateSquad(
    $input: CreateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    createSquad(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;
