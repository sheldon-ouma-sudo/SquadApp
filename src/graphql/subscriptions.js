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
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
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
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
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
      squad {
        nextToken
      }
      interests
      polls {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
      id
      users {
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
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
      id
      users {
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
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
      id
      users {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        createdAt
        updatedAt
      }
      category
      updatedAt
    }
  }
`;
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        createdAt
        updatedAt
      }
      category
      updatedAt
    }
  }
`;
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
        createdAt
        updatedAt
      }
      createdAt
      userID
      squad {
        id
        createdAt
        updatedAt
      }
      category
      updatedAt
    }
  }
`;
export const onCreateUserSquad = /* GraphQL */ `
  subscription OnCreateUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onCreateUserSquad(filter: $filter) {
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
        createdAt
        updatedAt
      }
      squad {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserSquad = /* GraphQL */ `
  subscription OnUpdateUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onUpdateUserSquad(filter: $filter) {
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
        createdAt
        updatedAt
      }
      squad {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserSquad = /* GraphQL */ `
  subscription OnDeleteUserSquad(
    $filter: ModelSubscriptionUserSquadFilterInput
  ) {
    onDeleteUserSquad(filter: $filter) {
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
        createdAt
        updatedAt
      }
      squad {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
