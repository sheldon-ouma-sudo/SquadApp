/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSways = /* GraphQL */ `
  mutation CreateSways(
    $input: CreateSwaysInput!
    $condition: ModelSwaysConditionInput
  ) {
    createSways(input: $input, condition: $condition) {
      id
      Squads {
        nextToken
      }
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSways = /* GraphQL */ `
  mutation UpdateSways(
    $input: UpdateSwaysInput!
    $condition: ModelSwaysConditionInput
  ) {
    updateSways(input: $input, condition: $condition) {
      id
      Squads {
        nextToken
      }
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSways = /* GraphQL */ `
  mutation DeleteSways(
    $input: DeleteSwaysInput!
    $condition: ModelSwaysConditionInput
  ) {
    deleteSways(input: $input, condition: $condition) {
      id
      Squads {
        nextToken
      }
      Users {
        nextToken
      }
      createdAt
      updatedAt
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
      swaysID
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
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
      swaysID
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
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
      swaysID
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
      users {
        nextToken
      }
      polls {
        nextToken
      }
      swaysID
      name
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
      users {
        nextToken
      }
      polls {
        nextToken
      }
      swaysID
      name
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
      users {
        nextToken
      }
      polls {
        nextToken
      }
      swaysID
      name
      createdAt
      updatedAt
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
      caption
      images
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      category
      votes
      feedback
      updatedAt
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
      caption
      images
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      category
      votes
      feedback
      updatedAt
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
      caption
      images
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      category
      votes
      feedback
      updatedAt
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
      userId
      squadId
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      userId
      squadId
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
      userId
      squadId
      user {
        id
        name
        username
        imageUrl
        numOfPolls
        interests
        swaysID
        createdAt
        updatedAt
      }
      squad {
        id
        swaysID
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
