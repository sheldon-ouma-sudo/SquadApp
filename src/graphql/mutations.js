/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSquadron = /* GraphQL */ `
  mutation CreateSquadron(
    $input: CreateSquadronInput!
    $condition: ModelSquadronConditionInput
  ) {
    createSquadron(input: $input, condition: $condition) {
      id
      Squads {
        nextToken
        __typename
      }
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
      Squads {
        nextToken
        __typename
      }
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
      Squads {
        nextToken
        __typename
      }
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
export const createPollComments = /* GraphQL */ `
  mutation CreatePollComments(
    $input: CreatePollCommentsInput!
    $condition: ModelPollCommentsConditionInput
  ) {
    createPollComments(input: $input, condition: $condition) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      pollCommentsUserId
      __typename
    }
  }
`;
export const updatePollComments = /* GraphQL */ `
  mutation UpdatePollComments(
    $input: UpdatePollCommentsInput!
    $condition: ModelPollCommentsConditionInput
  ) {
    updatePollComments(input: $input, condition: $condition) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      pollCommentsUserId
      __typename
    }
  }
`;
export const deletePollComments = /* GraphQL */ `
  mutation DeletePollComments(
    $input: DeletePollCommentsInput!
    $condition: ModelPollCommentsConditionInput
  ) {
    deletePollComments(input: $input, condition: $condition) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      pollCommentsUserId
      __typename
    }
  }
`;
export const createPollResponse = /* GraphQL */ `
  mutation CreatePollResponse(
    $input: CreatePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    createPollResponse(input: $input, condition: $condition) {
      id
      Poll {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      createdAt
      updatedAt
      pollResponsePollId
      __typename
    }
  }
`;
export const updatePollResponse = /* GraphQL */ `
  mutation UpdatePollResponse(
    $input: UpdatePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    updatePollResponse(input: $input, condition: $condition) {
      id
      Poll {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      createdAt
      updatedAt
      pollResponsePollId
      __typename
    }
  }
`;
export const deletePollResponse = /* GraphQL */ `
  mutation DeletePollResponse(
    $input: DeletePollResponseInput!
    $condition: ModelPollResponseConditionInput
  ) {
    deletePollResponse(input: $input, condition: $condition) {
      id
      Poll {
        id
        pollCaption
        pollMedia
        squadID
        userID
        livePoll
        closedPoll
        createdAt
        updatedAt
        pollPollResponseId
        __typename
      }
      createdAt
      updatedAt
      pollResponsePollId
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
      Polls {
        nextToken
        __typename
      }
      latestPoll {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      adminUser
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      squadronID
      createdAt
      updatedAt
      squadLatestPollId
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
      Polls {
        nextToken
        __typename
      }
      latestPoll {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      adminUser
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      squadronID
      createdAt
      updatedAt
      squadLatestPollId
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
      Polls {
        nextToken
        __typename
      }
      latestPoll {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      adminUser
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      squadronID
      createdAt
      updatedAt
      squadLatestPollId
      squadUserId
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
      livePoll
      closedPoll
      PollResponse {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      createdAt
      updatedAt
      pollPollResponseId
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
      livePoll
      closedPoll
      PollResponse {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      createdAt
      updatedAt
      pollPollResponseId
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
      livePoll
      closedPoll
      PollResponse {
        id
        createdAt
        updatedAt
        pollResponsePollId
        __typename
      }
      createdAt
      updatedAt
      pollPollResponseId
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
      numOfPolls
      numOfSquadron
      Squad {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
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
      userSquadId
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
      numOfPolls
      numOfSquadron
      Squad {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
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
      userSquadId
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
      numOfPolls
      numOfSquadron
      Squad {
        id
        adminUser
        squadronID
        createdAt
        updatedAt
        squadLatestPollId
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
      userSquadId
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
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
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
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
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
        numOfPolls
        numOfSquadron
        userInterests
        createdAt
        updatedAt
        userSquadId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
