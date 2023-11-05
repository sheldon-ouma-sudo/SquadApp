/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSquadron = /* GraphQL */ `
  mutation CreateSquadron(
    $input: CreateSquadronInput!
    $condition: ModelSquadronConditionInput
  ) {
    createSquadron(input: $input, condition: $condition) {
      id
      Users {
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
export const updateSquadron = /* GraphQL */ `
  mutation UpdateSquadron(
    $input: UpdateSquadronInput!
    $condition: ModelSquadronConditionInput
  ) {
    updateSquadron(input: $input, condition: $condition) {
      id
      Users {
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
export const deleteSquadron = /* GraphQL */ `
  mutation DeleteSquadron(
    $input: DeleteSquadronInput!
    $condition: ModelSquadronConditionInput
  ) {
    deleteSquadron(input: $input, condition: $condition) {
      id
      Users {
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
export const createSquad = /* GraphQL */ `
  mutation CreateSquad(
    $input: CreateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    createSquad(input: $input, condition: $condition) {
      id
      adminUser
      Users {
        nextToken
        __typename
      }
      squadronID
      createdAt
      updatedAt
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
      adminUser
      Users {
        nextToken
        __typename
      }
      squadronID
      createdAt
      updatedAt
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
      adminUser
      Users {
        nextToken
        __typename
      }
      squadronID
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squadID
      squadronID
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squadID
      squadronID
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squadID
      squadronID
      createdAt
      updatedAt
      __typename
    }
  }
`;
