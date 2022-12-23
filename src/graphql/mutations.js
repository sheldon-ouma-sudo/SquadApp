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
export const createSquadUser = /* GraphQL */ `
  mutation CreateSquadUser(
    $input: CreateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    createSquadUser(input: $input, condition: $condition) {
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
export const updateSquadUser = /* GraphQL */ `
  mutation UpdateSquadUser(
    $input: UpdateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    updateSquadUser(input: $input, condition: $condition) {
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
export const deleteSquadUser = /* GraphQL */ `
  mutation DeleteSquadUser(
    $input: DeleteSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    deleteSquadUser(input: $input, condition: $condition) {
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
export const createSquad = /* GraphQL */ `
  mutation CreateSquad(
    $input: CreateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    createSquad(input: $input, condition: $condition) {
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
export const updateSquad = /* GraphQL */ `
  mutation UpdateSquad(
    $input: UpdateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    updateSquad(input: $input, condition: $condition) {
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
export const deleteSquad = /* GraphQL */ `
  mutation DeleteSquad(
    $input: DeleteSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    deleteSquad(input: $input, condition: $condition) {
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
