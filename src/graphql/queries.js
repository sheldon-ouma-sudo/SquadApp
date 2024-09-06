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
        userPrimarySquad
        nonPrimarySquadsCreated
        numOfPolls
        numOfSquadJoined
        numSquadCreated
        superUser
        userProfilePicture
        userInterests
        Bio
        email
        squadJoined
        squadJoinedID
        createdAt
        updatedAt
        __typename
      }
      notificationID
      requestingUserID
      squads
      message
      Squad {
        id
        authUserID
        authUserName
        bio
        public
        squadName
        numOfPolls
        numOfUsers
        createdAt
        updatedAt
        __typename
      }
      squadID
      createdAt
      updatedAt
      requestToBeAddedInASquadUserId
      requestToBeAddedInASquadSquadId
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
        requestingUserID
        squads
        message
        squadID
        createdAt
        updatedAt
        requestToBeAddedInASquadUserId
        requestToBeAddedInASquadSquadId
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
        requestingUserID
        squads
        message
        squadID
        createdAt
        updatedAt
        requestToBeAddedInASquadUserId
        requestToBeAddedInASquadSquadId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRequestToJoinASquad = /* GraphQL */ `
  query GetRequestToJoinASquad($id: ID!) {
    getRequestToJoinASquad(id: $id) {
      id
      User {
        id
        name
        userName
        imageUrl
        userPrimarySquad
        nonPrimarySquadsCreated
        numOfPolls
        numOfSquadJoined
        numSquadCreated
        superUser
        userProfilePicture
        userInterests
        Bio
        email
        squadJoined
        squadJoinedID
        createdAt
        updatedAt
        __typename
      }
      notificationID
      requestingUserID
      message
      Squad {
        id
        authUserID
        authUserName
        bio
        public
        squadName
        numOfPolls
        numOfUsers
        createdAt
        updatedAt
        __typename
      }
      squadID
      createdAt
      updatedAt
      requestToJoinASquadUserId
      requestToJoinASquadSquadId
      __typename
    }
  }
`;
export const listRequestToJoinASquads = /* GraphQL */ `
  query ListRequestToJoinASquads(
    $filter: ModelRequestToJoinASquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestToJoinASquads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        requestingUserID
        message
        squadID
        createdAt
        updatedAt
        requestToJoinASquadUserId
        requestToJoinASquadSquadId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const requestToJoinASquadsByNotificationID = /* GraphQL */ `
  query RequestToJoinASquadsByNotificationID(
    $notificationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRequestToJoinASquadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    requestToJoinASquadsByNotificationID(
      notificationID: $notificationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        notificationID
        requestingUserID
        message
        squadID
        createdAt
        updatedAt
        requestToJoinASquadUserId
        requestToJoinASquadSquadId
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
      RequestToJoinASquads {
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
        superPoll
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
      User {
        id
        name
        userName
        imageUrl
        userPrimarySquad
        nonPrimarySquadsCreated
        numOfPolls
        numOfSquadJoined
        numSquadCreated
        superUser
        userProfilePicture
        userInterests
        Bio
        email
        squadJoined
        squadJoinedID
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
        superPoll
        pollCommentArray
        squadID
        pollItems
        createdAt
        updatedAt
        pollPollRequestId
        __typename
      }
      comment
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
        comment
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
        comment
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
        comment
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
        comment
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
      superPoll
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
        superPoll
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
        superPoll
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
      numOfUsers
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
        numOfUsers
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
      userPrimarySquad
      nonPrimarySquadsCreated
      numOfPolls
      numOfSquadJoined
      numSquadCreated
      superUser
      userProfilePicture
      userInterests
      Bio
      email
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
      squadJoinedID
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
        userPrimarySquad
        nonPrimarySquadsCreated
        numOfPolls
        numOfSquadJoined
        numSquadCreated
        superUser
        userProfilePicture
        userInterests
        Bio
        email
        squadJoined
        squadJoinedID
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
        superPoll
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
        numOfUsers
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
        numOfUsers
        createdAt
        updatedAt
        __typename
      }
      user {
        id
        name
        userName
        imageUrl
        userPrimarySquad
        nonPrimarySquadsCreated
        numOfPolls
        numOfSquadJoined
        numSquadCreated
        superUser
        userProfilePicture
        userInterests
        Bio
        email
        squadJoined
        squadJoinedID
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
