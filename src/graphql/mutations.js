/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRequestToBeAddedInASquad = /* GraphQL */ `
  mutation CreateRequestToBeAddedInASquad(
    $input: CreateRequestToBeAddedInASquadInput!
    $condition: ModelRequestToBeAddedInASquadConditionInput
  ) {
    createRequestToBeAddedInASquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      notificationID
      createdAt
      updatedAt
      requestToBeAddedInASquadUserId
      __typename
    }
  }
`;
export const updateRequestToBeAddedInASquad = /* GraphQL */ `
  mutation UpdateRequestToBeAddedInASquad(
    $input: UpdateRequestToBeAddedInASquadInput!
    $condition: ModelRequestToBeAddedInASquadConditionInput
  ) {
    updateRequestToBeAddedInASquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      notificationID
      createdAt
      updatedAt
      requestToBeAddedInASquadUserId
      __typename
    }
  }
`;
export const deleteRequestToBeAddedInASquad = /* GraphQL */ `
  mutation DeleteRequestToBeAddedInASquad(
    $input: DeleteRequestToBeAddedInASquadInput!
    $condition: ModelRequestToBeAddedInASquadConditionInput
  ) {
    deleteRequestToBeAddedInASquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      notificationID
      createdAt
      updatedAt
      requestToBeAddedInASquadUserId
      __typename
    }
  }
`;
export const createRequestToAJoinSquad = /* GraphQL */ `
  mutation CreateRequestToAJoinSquad(
    $input: CreateRequestToAJoinSquadInput!
    $condition: ModelRequestToAJoinSquadConditionInput
  ) {
    createRequestToAJoinSquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      Squads {
        nextToken
        __typename
      }
      notificationID
      message
      createdAt
      updatedAt
      requestToAJoinSquadUserId
      __typename
    }
  }
`;
export const updateRequestToAJoinSquad = /* GraphQL */ `
  mutation UpdateRequestToAJoinSquad(
    $input: UpdateRequestToAJoinSquadInput!
    $condition: ModelRequestToAJoinSquadConditionInput
  ) {
    updateRequestToAJoinSquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      Squads {
        nextToken
        __typename
      }
      notificationID
      message
      createdAt
      updatedAt
      requestToAJoinSquadUserId
      __typename
    }
  }
`;
export const deleteRequestToAJoinSquad = /* GraphQL */ `
  mutation DeleteRequestToAJoinSquad(
    $input: DeleteRequestToAJoinSquadInput!
    $condition: ModelRequestToAJoinSquadConditionInput
  ) {
    deleteRequestToAJoinSquad(input: $input, condition: $condition) {
      id
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
      Squads {
        nextToken
        __typename
      }
      notificationID
      message
      createdAt
      updatedAt
      requestToAJoinSquadUserId
      __typename
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      pollRequestsArray
      pollResponsesArray
      pollCommentsArray
      squadAddRequestsArray
      SquadJoinRequestArray
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      userID
      new
      RequestToBeAddedInASquads {
        nextToken
        __typename
      }
      RequestToAJoinSquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      pollRequestsArray
      pollResponsesArray
      pollCommentsArray
      squadAddRequestsArray
      SquadJoinRequestArray
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      userID
      new
      RequestToBeAddedInASquads {
        nextToken
        __typename
      }
      RequestToAJoinSquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      pollRequestsArray
      pollResponsesArray
      pollCommentsArray
      squadAddRequestsArray
      SquadJoinRequestArray
      PollComments {
        nextToken
        __typename
      }
      PollRequests {
        nextToken
        __typename
      }
      userID
      new
      RequestToBeAddedInASquads {
        nextToken
        __typename
      }
      RequestToAJoinSquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      pollID
      userID
      score
      PollComments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      pollID
      userID
      score
      PollComments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      pollID
      userID
      score
      PollComments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPollRequest = /* GraphQL */ `
  mutation CreatePollRequest(
    $input: CreatePollRequestInput!
    $condition: ModelPollRequestConditionInput
  ) {
    createPollRequest(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      ParentPollID
      userID
      pollRequestsId
      notificationID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const updatePollRequest = /* GraphQL */ `
  mutation UpdatePollRequest(
    $input: UpdatePollRequestInput!
    $condition: ModelPollRequestConditionInput
  ) {
    updatePollRequest(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      ParentPollID
      userID
      pollRequestsId
      notificationID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const deletePollRequest = /* GraphQL */ `
  mutation DeletePollRequest(
    $input: DeletePollRequestInput!
    $condition: ModelPollRequestConditionInput
  ) {
    deletePollRequest(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      ParentPollID
      userID
      pollRequestsId
      notificationID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const createPollComment = /* GraphQL */ `
  mutation CreatePollComment(
    $input: CreatePollCommentInput!
    $condition: ModelPollCommentConditionInput
  ) {
    createPollComment(input: $input, condition: $condition) {
      id
      pollID
      userID
      numOfLikes
      notificationID
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePollComment = /* GraphQL */ `
  mutation UpdatePollComment(
    $input: UpdatePollCommentInput!
    $condition: ModelPollCommentConditionInput
  ) {
    updatePollComment(input: $input, condition: $condition) {
      id
      pollID
      userID
      numOfLikes
      notificationID
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePollComment = /* GraphQL */ `
  mutation DeletePollComment(
    $input: DeletePollCommentInput!
    $condition: ModelPollCommentConditionInput
  ) {
    deletePollComment(input: $input, condition: $condition) {
      id
      pollID
      userID
      numOfLikes
      notificationID
      pollresponseID
      User {
        id
        name
        userName
        imageUrl
        userSquadId
        numOfPolls
        numOfSquadJoined
        superUser
        userInterests
        squadJoined
        createdAt
        updatedAt
        __typename
      }
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      createdAt
      updatedAt
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
      pollCommentArray
      squadID
      pollItems
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        ParentPollID
        userID
        pollRequestsId
        notificationID
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
      pollCommentArray
      squadID
      pollItems
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        ParentPollID
        userID
        pollRequestsId
        notificationID
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
      pollCommentArray
      squadID
      pollItems
      PollComments {
        nextToken
        __typename
      }
      PollRequest {
        id
        ParentPollID
        userID
        pollRequestsId
        notificationID
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
export const createSquad = /* GraphQL */ `
  mutation CreateSquad(
    $input: CreateSquadInput!
    $condition: ModelSquadConditionInput
  ) {
    createSquad(input: $input, condition: $condition) {
      id
      Users {
        nextToken
        __typename
      }
      authUserID
      authUserName
      bio
      public
      squadName
      numOfPolls
      Polls {
        nextToken
        __typename
      }
      requesttojoinsquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      Users {
        nextToken
        __typename
      }
      authUserID
      authUserName
      bio
      public
      squadName
      numOfPolls
      Polls {
        nextToken
        __typename
      }
      requesttojoinsquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      Users {
        nextToken
        __typename
      }
      authUserID
      authUserName
      bio
      public
      squadName
      numOfPolls
      Polls {
        nextToken
        __typename
      }
      requesttojoinsquads {
        nextToken
        __typename
      }
      createdAt
      updatedAt
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
      userSquadId
      numOfPolls
      numOfSquadJoined
      superUser
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
      Notifications {
        nextToken
        __typename
      }
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
      userSquadId
      numOfPolls
      numOfSquadJoined
      superUser
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
      Notifications {
        nextToken
        __typename
      }
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
      userSquadId
      numOfPolls
      numOfSquadJoined
      superUser
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
      Notifications {
        nextToken
        __typename
      }
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
export const createRequestToAJoinSquadSquad = /* GraphQL */ `
  mutation CreateRequestToAJoinSquadSquad(
    $input: CreateRequestToAJoinSquadSquadInput!
    $condition: ModelRequestToAJoinSquadSquadConditionInput
  ) {
    createRequestToAJoinSquadSquad(input: $input, condition: $condition) {
      id
      requestToAJoinSquadId
      squadId
      requestToAJoinSquad {
        id
        notificationID
        message
        createdAt
        updatedAt
        requestToAJoinSquadUserId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const updateRequestToAJoinSquadSquad = /* GraphQL */ `
  mutation UpdateRequestToAJoinSquadSquad(
    $input: UpdateRequestToAJoinSquadSquadInput!
    $condition: ModelRequestToAJoinSquadSquadConditionInput
  ) {
    updateRequestToAJoinSquadSquad(input: $input, condition: $condition) {
      id
      requestToAJoinSquadId
      squadId
      requestToAJoinSquad {
        id
        notificationID
        message
        createdAt
        updatedAt
        requestToAJoinSquadUserId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const deleteRequestToAJoinSquadSquad = /* GraphQL */ `
  mutation DeleteRequestToAJoinSquadSquad(
    $input: DeleteRequestToAJoinSquadSquadInput!
    $condition: ModelRequestToAJoinSquadSquadConditionInput
  ) {
    deleteRequestToAJoinSquadSquad(input: $input, condition: $condition) {
      id
      requestToAJoinSquadId
      squadId
      requestToAJoinSquad {
        id
        notificationID
        message
        createdAt
        updatedAt
        requestToAJoinSquadUserId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const createSquadPoll = /* GraphQL */ `
  mutation CreateSquadPoll(
    $input: CreateSquadPollInput!
    $condition: ModelSquadPollConditionInput
  ) {
    createSquadPoll(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const updateSquadPoll = /* GraphQL */ `
  mutation UpdateSquadPoll(
    $input: UpdateSquadPollInput!
    $condition: ModelSquadPollConditionInput
  ) {
    updateSquadPoll(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const deleteSquadPoll = /* GraphQL */ `
  mutation DeleteSquadPoll(
    $input: DeleteSquadPollInput!
    $condition: ModelSquadPollConditionInput
  ) {
    deleteSquadPoll(input: $input, condition: $condition) {
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
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
export const createSquadUser = /* GraphQL */ `
  mutation CreateSquadUser(
    $input: CreateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    createSquadUser(input: $input, condition: $condition) {
      id
      squadId
      userId
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
        superUser
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
export const updateSquadUser = /* GraphQL */ `
  mutation UpdateSquadUser(
    $input: UpdateSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    updateSquadUser(input: $input, condition: $condition) {
      id
      squadId
      userId
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
        superUser
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
export const deleteSquadUser = /* GraphQL */ `
  mutation DeleteSquadUser(
    $input: DeleteSquadUserInput!
    $condition: ModelSquadUserConditionInput
  ) {
    deleteSquadUser(input: $input, condition: $condition) {
      id
      squadId
      userId
      squad {
        id
        authUserID
        authUserName
        bio
        public
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
        superUser
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
