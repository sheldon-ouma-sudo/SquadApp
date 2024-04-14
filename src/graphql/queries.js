/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRequestToBeAddedInASquad = /* GraphQL */ `
  query GetRequestToBeAddedInASquad($id: ID!) {
    getRequestToBeAddedInASquad(id: $id) {
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
export const listRequestToBeAddedInASquads = /* GraphQL */ `
  query ListRequestToBeAddedInASquads(
    $filter: ModelRequestToBeAddedInASquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestToBeAddedInASquads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        createdAt
        updatedAt
        requestToBeAddedInASquadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestToBeAddedInASquadsByNotificationID = /* GraphQL */ `
  query RequestToBeAddedInASquadsByNotificationID(
    $notificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestToBeAddedInASquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestToBeAddedInASquadsByNotificationID(
      notificationID: $notificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        createdAt
        updatedAt
        requestToBeAddedInASquadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRequestToAJoinSquad = /* GraphQL */ `
  query GetRequestToAJoinSquad($id: ID!) {
    getRequestToAJoinSquad(id: $id) {
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
export const listRequestToAJoinSquads = /* GraphQL */ `
  query ListRequestToAJoinSquads(
    $filter: ModelRequestToAJoinSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestToAJoinSquads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        message
        createdAt
        updatedAt
        requestToAJoinSquadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestToAJoinSquadsByNotificationID = /* GraphQL */ `
  query RequestToAJoinSquadsByNotificationID(
    $notificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestToAJoinSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestToAJoinSquadsByNotificationID(
      notificationID: $notificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        message
        createdAt
        updatedAt
        requestToAJoinSquadUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      pollRequestsArray
      pollResponsesArray
      pollCommentsArray
      pollLikeResponseArray
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollRequestsArray
        pollResponsesArray
        pollCommentsArray
        pollLikeResponseArray
        squadAddRequestsArray
        SquadJoinRequestArray
        userID
        new
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notificationsByUserID = /* GraphQL */ `
  query NotificationsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollRequestsArray
        pollResponsesArray
        pollCommentsArray
        pollLikeResponseArray
        squadAddRequestsArray
        SquadJoinRequestArray
        userID
        new
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPollResponse = /* GraphQL */ `
  query GetPollResponse($id: ID!) {
    getPollResponse(id: $id) {
      id
      pollID
      userID
      caption
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
export const listPollResponses = /* GraphQL */ `
  query ListPollResponses(
    $filter: ModelPollResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollID
        userID
        caption
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollResponsesByPollID = /* GraphQL */ `
  query PollResponsesByPollID(
    $pollID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollResponsesByPollID(
      pollID: $pollID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        caption
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollResponsesByUserID = /* GraphQL */ `
  query PollResponsesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollResponsesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        caption
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPollRequest = /* GraphQL */ `
  query GetPollRequest($id: ID!) {
    getPollRequest(id: $id) {
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
      responseStatus
      notificationID
      createdAt
      updatedAt
      pollRequestPollId
      __typename
    }
  }
`;
export const listPollRequests = /* GraphQL */ `
  query ListPollRequests(
    $filter: ModelPollRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ParentPollID
        userID
        pollRequestsId
        responseStatus
        notificationID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollRequestsByUserID = /* GraphQL */ `
  query PollRequestsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollRequestsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ParentPollID
        userID
        pollRequestsId
        responseStatus
        notificationID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollRequestsByNotificationID = /* GraphQL */ `
  query PollRequestsByNotificationID(
    $notificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollRequestsByNotificationID(
      notificationID: $notificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ParentPollID
        userID
        pollRequestsId
        responseStatus
        notificationID
        createdAt
        updatedAt
        pollRequestPollId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPollComment = /* GraphQL */ `
  query GetPollComment($id: ID!) {
    getPollComment(id: $id) {
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
export const listPollComments = /* GraphQL */ `
  query ListPollComments(
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPollComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollID
        userID
        numOfLikes
        notificationID
        pollresponseID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByPollID = /* GraphQL */ `
  query PollCommentsByPollID(
    $pollID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByPollID(
      pollID: $pollID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        notificationID
        pollresponseID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByUserID = /* GraphQL */ `
  query PollCommentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        notificationID
        pollresponseID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByNotificationID = /* GraphQL */ `
  query PollCommentsByNotificationID(
    $notificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByNotificationID(
      notificationID: $notificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        notificationID
        pollresponseID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const pollCommentsByPollresponseID = /* GraphQL */ `
  query PollCommentsByPollresponseID(
    $pollresponseID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollCommentsByPollresponseID(
      pollresponseID: $pollresponseID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollID
        userID
        numOfLikes
        notificationID
        pollresponseID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
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
        responseStatus
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
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const pollsByUserID = /* GraphQL */ `
  query PollsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pollsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSquad = /* GraphQL */ `
  query GetSquad($id: ID!) {
    getSquad(id: $id) {
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
export const listSquads = /* GraphQL */ `
  query ListSquads(
    $filter: ModelSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getRequestToAJoinSquadSquad = /* GraphQL */ `
  query GetRequestToAJoinSquadSquad($id: ID!) {
    getRequestToAJoinSquadSquad(id: $id) {
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
export const listRequestToAJoinSquadSquads = /* GraphQL */ `
  query ListRequestToAJoinSquadSquads(
    $filter: ModelRequestToAJoinSquadSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestToAJoinSquadSquads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestToAJoinSquadId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestToAJoinSquadSquadsByRequestToAJoinSquadId = /* GraphQL */ `
  query RequestToAJoinSquadSquadsByRequestToAJoinSquadId(
    $requestToAJoinSquadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestToAJoinSquadSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestToAJoinSquadSquadsByRequestToAJoinSquadId(
      requestToAJoinSquadId: $requestToAJoinSquadId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestToAJoinSquadId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestToAJoinSquadSquadsBySquadId = /* GraphQL */ `
  query RequestToAJoinSquadSquadsBySquadId(
    $squadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestToAJoinSquadSquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestToAJoinSquadSquadsBySquadId(
      squadId: $squadId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        requestToAJoinSquadId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSquadPoll = /* GraphQL */ `
  query GetSquadPoll($id: ID!) {
    getSquadPoll(id: $id) {
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
export const listSquadPolls = /* GraphQL */ `
  query ListSquadPolls(
    $filter: ModelSquadPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadPollsByPollId = /* GraphQL */ `
  query SquadPollsByPollId(
    $pollId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadPollsByPollId(
      pollId: $pollId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadPollsBySquadId = /* GraphQL */ `
  query SquadPollsBySquadId(
    $squadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadPollsBySquadId(
      squadId: $squadId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollId
        squadId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSquadUser = /* GraphQL */ `
  query GetSquadUser($id: ID!) {
    getSquadUser(id: $id) {
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
export const listSquadUsers = /* GraphQL */ `
  query ListSquadUsers(
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSquadUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        squadId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadUsersBySquadId = /* GraphQL */ `
  query SquadUsersBySquadId(
    $squadId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadUsersBySquadId(
      squadId: $squadId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const squadUsersByUserId = /* GraphQL */ `
  query SquadUsersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSquadUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    squadUsersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        squadId
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
