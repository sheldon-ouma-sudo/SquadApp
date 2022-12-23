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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateSquadUser = /* GraphQL */ `
  subscription OnCreateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onCreateSquadUser(filter: $filter) {
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
export const onUpdateSquadUser = /* GraphQL */ `
  subscription OnUpdateSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onUpdateSquadUser(filter: $filter) {
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
export const onDeleteSquadUser = /* GraphQL */ `
  subscription OnDeleteSquadUser(
    $filter: ModelSubscriptionSquadUserFilterInput
  ) {
    onDeleteSquadUser(filter: $filter) {
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
export const onCreateSquad = /* GraphQL */ `
  subscription OnCreateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onCreateSquad(filter: $filter) {
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
export const onUpdateSquad = /* GraphQL */ `
  subscription OnUpdateSquad($filter: ModelSubscriptionSquadFilterInput) {
    onUpdateSquad(filter: $filter) {
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
export const onDeleteSquad = /* GraphQL */ `
  subscription OnDeleteSquad($filter: ModelSubscriptionSquadFilterInput) {
    onDeleteSquad(filter: $filter) {
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
