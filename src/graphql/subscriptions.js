/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSquadron = /* GraphQL */ `
  subscription OnCreateSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onCreateSquadron(filter: $filter) {
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
export const onUpdateSquadron = /* GraphQL */ `
  subscription OnUpdateSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onUpdateSquadron(filter: $filter) {
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
export const onDeleteSquadron = /* GraphQL */ `
  subscription OnDeleteSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onDeleteSquadron(filter: $filter) {
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
export const onCreatePollComments = /* GraphQL */ `
  subscription OnCreatePollComments(
    $filter: ModelSubscriptionPollCommentsFilterInput
  ) {
    onCreatePollComments(filter: $filter) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
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
export const onUpdatePollComments = /* GraphQL */ `
  subscription OnUpdatePollComments(
    $filter: ModelSubscriptionPollCommentsFilterInput
  ) {
    onUpdatePollComments(filter: $filter) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
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
export const onDeletePollComments = /* GraphQL */ `
  subscription OnDeletePollComments(
    $filter: ModelSubscriptionPollCommentsFilterInput
  ) {
    onDeletePollComments(filter: $filter) {
      id
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        numOfPolls
        numOfSquadron
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
export const onCreatePollResponse = /* GraphQL */ `
  subscription OnCreatePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onCreatePollResponse(filter: $filter) {
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
export const onUpdatePollResponse = /* GraphQL */ `
  subscription OnUpdatePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onUpdatePollResponse(filter: $filter) {
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
export const onDeletePollResponse = /* GraphQL */ `
  subscription OnDeletePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onDeletePollResponse(filter: $filter) {
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
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
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
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
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
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
      createdAt
      updatedAt
      userSquadId
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
      createdAt
      updatedAt
      userSquadId
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
      createdAt
      updatedAt
      userSquadId
      __typename
    }
  }
`;
export const onCreateSquadronUser = /* GraphQL */ `
  subscription OnCreateSquadronUser(
    $filter: ModelSubscriptionSquadronUserFilterInput
  ) {
    onCreateSquadronUser(filter: $filter) {
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
export const onUpdateSquadronUser = /* GraphQL */ `
  subscription OnUpdateSquadronUser(
    $filter: ModelSubscriptionSquadronUserFilterInput
  ) {
    onUpdateSquadronUser(filter: $filter) {
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
export const onDeleteSquadronUser = /* GraphQL */ `
  subscription OnDeleteSquadronUser(
    $filter: ModelSubscriptionSquadronUserFilterInput
  ) {
    onDeleteSquadronUser(filter: $filter) {
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
