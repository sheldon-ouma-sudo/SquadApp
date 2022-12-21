/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateSquadUser = /* GraphQL */ `
  subscription OnCreateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onCreateSquadUser(filter: $filter) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSquadUser = /* GraphQL */ `
  subscription OnUpdateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onUpdateSquadUser(filter: $filter) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSquadUser = /* GraphQL */ `
  subscription OnDeleteSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onDeleteSquadUser(filter: $filter) {
      id
      userID
      squadID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
      id
      createdAt
      updatedAt
    }
  }
`;
