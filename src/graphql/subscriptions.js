/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePollResponse = /* GraphQL */ `
  subscription OnCreatePollResponse(
    $filter: ModelSubscriptionPollResponseFilterInput
  ) {
    onCreatePollResponse(filter: $filter) {
      id
      pollID
      userID
      score
      createdAt
      updatedAt
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
      pollID
      userID
      score
      createdAt
      updatedAt
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
      pollID
      userID
      score
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePollRequest = /* GraphQL */ `
  subscription OnCreatePollRequest(
    $filter: ModelSubscriptionPollRequestFilterInput
  ) {
    onCreatePollRequest(filter: $filter) {
      id
      Poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      userID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const onUpdatePollRequest = /* GraphQL */ `
  subscription OnUpdatePollRequest(
    $filter: ModelSubscriptionPollRequestFilterInput
  ) {
    onUpdatePollRequest(filter: $filter) {
      id
      Poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      userID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const onDeletePollRequest = /* GraphQL */ `
  subscription OnDeletePollRequest(
    $filter: ModelSubscriptionPollRequestFilterInput
  ) {
    onDeletePollRequest(filter: $filter) {
      id
      Poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      userID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const onCreatePollComment = /* GraphQL */ `
  subscription OnCreatePollComment(
    $filter: ModelSubscriptionPollCommentFilterInput
  ) {
    onCreatePollComment(filter: $filter) {
      id
      pollID
      userID
      numOfLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePollComment = /* GraphQL */ `
  subscription OnUpdatePollComment(
    $filter: ModelSubscriptionPollCommentFilterInput
  ) {
    onUpdatePollComment(filter: $filter) {
      id
      pollID
      userID
      numOfLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePollComment = /* GraphQL */ `
  subscription OnDeletePollComment(
    $filter: ModelSubscriptionPollCommentFilterInput
  ) {
    onDeletePollComment(filter: $filter) {
      id
      pollID
      userID
      numOfLikes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
      id
      totalNumOfVotes
      pollMedia
      closed
      open
      userID
      numOfLikes
      pollAudience
      pollCaption
      pollLabel
      pollScore
      pollItems {
        id
        title
        votes
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        userID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      pollPollRequestId
      __typename
    }
  }
`;
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
      id
      totalNumOfVotes
      pollMedia
      closed
      open
      userID
      numOfLikes
      pollAudience
      pollCaption
      pollLabel
      pollScore
      pollItems {
        id
        title
        votes
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        userID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      pollPollRequestId
      __typename
    }
  }
`;
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
      id
      totalNumOfVotes
      pollMedia
      closed
      open
      userID
      numOfLikes
      pollAudience
      pollCaption
      pollLabel
      pollScore
      pollItems {
        id
        title
        votes
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        userID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      pollPollRequestId
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
      Polls {
        nextToken
        __typename
      }
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
      Polls {
        nextToken
        __typename
      }
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
      Polls {
        nextToken
        __typename
      }
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
      numOfSquadJoined
      userInterests
      Polls {
        nextToken
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squadJoined
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
      numOfSquadJoined
      userInterests
      Polls {
        nextToken
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squadJoined
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
      numOfSquadJoined
      userInterests
      Polls {
        nextToken
        __typename
      }
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      PollResponses {
        nextToken
        __typename
      }
      squadJoined
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
export const onCreateSquadPoll = /* GraphQL */ `
  subscription OnCreateSquadPoll(
    $filter: ModelSubscriptionSquadPollFilterInput
  ) {
    onCreateSquadPoll(filter: $filter) {
      id
      pollId
      squadId
      poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        squadName
        numOfPolls
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
export const onUpdateSquadPoll = /* GraphQL */ `
  subscription OnUpdateSquadPoll(
    $filter: ModelSubscriptionSquadPollFilterInput
  ) {
    onUpdateSquadPoll(filter: $filter) {
      id
      pollId
      squadId
      poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        squadName
        numOfPolls
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
export const onDeleteSquadPoll = /* GraphQL */ `
  subscription OnDeleteSquadPoll(
    $filter: ModelSubscriptionSquadPollFilterInput
  ) {
    onDeleteSquadPoll(filter: $filter) {
      id
      pollId
      squadId
      poll {
        id
        totalNumOfVotes
        pollMedia
        closed
        open
        userID
        numOfLikes
        pollAudience
        pollCaption
        pollLabel
        pollScore
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        squadName
        numOfPolls
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
        numOfSquadJoined
        userInterests
        squadJoined
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
        numOfSquadJoined
        userInterests
        squadJoined
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
        numOfSquadJoined
        userInterests
        squadJoined
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
