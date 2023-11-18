/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePolls = /* GraphQL */ `
  subscription OnCreatePolls($filter: ModelSubscriptionPollsFilterInput) {
    onCreatePolls(filter: $filter) {
      id
      pollAudience
      pollCaption
      pollMedia
      totalNumOfVotes
      closed
      opened
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePolls = /* GraphQL */ `
  subscription OnUpdatePolls($filter: ModelSubscriptionPollsFilterInput) {
    onUpdatePolls(filter: $filter) {
      id
      pollAudience
      pollCaption
      pollMedia
      totalNumOfVotes
      closed
      opened
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePolls = /* GraphQL */ `
  subscription OnDeletePolls($filter: ModelSubscriptionPollsFilterInput) {
    onDeletePolls(filter: $filter) {
      id
      pollAudience
      pollCaption
      pollMedia
      totalNumOfVotes
      closed
      opened
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
      id
      Users {
        nextToken
        __typename
      }
      authUserID
      squadName
      numOfPolls
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
      id
      Users {
        nextToken
        __typename
      }
      authUserID
      squadName
      numOfPolls
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
      id
      Users {
        nextToken
        __typename
      }
      authUserID
      squadName
      numOfPolls
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squads {
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squads {
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
      userSquadId
      numOfPolls
      numOfSquadron
      userInterests
      squads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSquadUser = /* GraphQL */ `
  subscription OnCreateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onCreateSquadUser(filter: $filter) {
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
export const onUpdateSquadUser = /* GraphQL */ `
  subscription OnUpdateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onUpdateSquadUser(filter: $filter) {
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
export const onDeleteSquadUser = /* GraphQL */ `
  subscription OnDeleteSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onDeleteSquadUser(filter: $filter) {
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
