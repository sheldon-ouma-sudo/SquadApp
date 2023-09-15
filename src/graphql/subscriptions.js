/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
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
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
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
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
export const onCreateUserSquad = /* GraphQL */ `
  subscription OnCreateUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onCreateUserSquad(filter: $filter) {
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
export const onUpdateUserSquad = /* GraphQL */ `
  subscription OnUpdateUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onUpdateUserSquad(filter: $filter) {
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
export const onDeleteUserSquad = /* GraphQL */ `
  subscription OnDeleteUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onDeleteUserSquad(filter: $filter) {
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
