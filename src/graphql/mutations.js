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
export const updateSquad = /* GraphQL */ `
  mutation UpdateSquad(
    $input: UpdateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    updateSquad(input: $input, condition: $condition) {
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
export const deleteSquad = /* GraphQL */ `
  mutation DeleteSquad(
    $input: DeleteSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    deleteSquad(input: $input, condition: $condition) {
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
export const createSquadronUser = /* GraphQL */ `
  mutation CreateSquadronUser(
    $input: CreateSquadronUserInput!
    $condition: ModelSquadronUserConditionInput
  ) {
    createSquadronUser(input: $input, condition: $condition) {
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
export const updateSquadronUser = /* GraphQL */ `
  mutation UpdateSquadronUser(
    $input: UpdateSquadronUserInput!
    $condition: ModelSquadronUserConditionInput
  ) {
    updateSquadronUser(input: $input, condition: $condition) {
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
export const deleteSquadronUser = /* GraphQL */ `
  mutation DeleteSquadronUser(
    $input: DeleteSquadronUserInput!
    $condition: ModelSquadronUserConditionInput
  ) {
    deleteSquadronUser(input: $input, condition: $condition) {
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
