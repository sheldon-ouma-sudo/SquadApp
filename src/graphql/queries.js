/* eslint-disable */
// this is an auto generated file. This will be overwritten

// export const getSquadron = /* GraphQL */ `
//   query GetSquadron($id: ID!) {
//     getSquadron(id: $id) {
//       id
//       Users {
//         nextToken
//         __typename
//       }
//       Squads {
//         nextToken
//         __typename
//       }
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;
// export const listSquadrons = /* GraphQL */ `
//   query ListSquadrons(
//     $filter: ModelSquadronFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSquadrons(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         createdAt
//         updatedAt
//         __typename
//       }
//       nextToken
//       __typename
//     }
//   }
// `;
// export const getSquad = /* GraphQL */ `
//   query GetSquad($id: ID!) {
//     getSquad(id: $id) {
//       id
//       adminUser
//       Users {
//         nextToken
//         __typename
//       }
//       squadronID
//       createdAt
//       updatedAt
//       __typename
//     }
//   }
// `;
// export const listSquads = /* GraphQL */ `
//   query ListSquads(
//     $filter: ModelSquadFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSquads(filter: $filter, limit: $limit, nextToken: $nextToken) {
//       items {
//         id
//         adminUser
//         squadronID
//         createdAt
//         updatedAt
//         __typename
//       }
//       nextToken
//       __typename
//     }
//   }
// `;
// export const squadsBySquadronID = /* GraphQL */ `
//   query SquadsBySquadronID(
//     $squadronID: ID!
//     $sortDirection: ModelSortDirection
//     $filter: ModelSquadFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     squadsBySquadronID(
//       squadronID: $squadronID
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         id
//         adminUser
//         squadronID
//         createdAt
//         updatedAt
//         __typename
//       }
//       nextToken
//       __typename
//     }
//   }
// `;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        numOfSquadron
        userInterests
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersBySquadID = /* GraphQL */ `
  query UsersBySquadID(
    $squadID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersBySquadID(
      squadID: $squadID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const usersBySquadronID = /* GraphQL */ `
  query UsersBySquadronID(
    $squadronID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersBySquadronID(
      squadronID: $squadronID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
