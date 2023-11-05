/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSquadron = /* GraphQL */ `
  subscription OnCreateSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onCreateSquadron(filter: $filter) {
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
export const onUpdateSquadron = /* GraphQL */ `
  subscription OnUpdateSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onUpdateSquadron(filter: $filter) {
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
export const onDeleteSquadron = /* GraphQL */ `
  subscription OnDeleteSquadron($filter: ModelSubscriptionSquadronFilterInput) {
    onDeleteSquadron(filter: $filter) {
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
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
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
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
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
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
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
      squadID
      squadronID
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
      squadID
      squadronID
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
      squadID
      squadronID
      createdAt
      updatedAt
      __typename
    }
  }
`;
