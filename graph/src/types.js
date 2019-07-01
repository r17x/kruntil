const { gql } = require("apollo-server-micro");
module.exports = gql`
  type Post {
    userId: Int!
    id: ID!
    title: String!
    body: String!

    author: User!
    comments: [Comment!]!
  }

  type Comment {
    postId: Int!
    id: ID!
    name: String!
    email: String!
    body: String!
  }

  type Photo {
    albumId: Int!
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  type Album {
    userId: Int!
    id: ID!
    title: String!

    author: User!
    photos: [Photo!]!
  }

  type Geo {
    lat: String!
    lng: String!
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
    address: Address!

    posts: [Post!]!
    albums: [Album!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User

    posts(userId: ID): [Post!]!
    post(id: ID!): Post

    comments: [Comment!]!
    comment(id: ID!): Comment

    photos: [Photo!]!
    photo(id: ID!): Photo

    albums(userId: ID): [Album!]!
    album(id: ID!): Album
  }

  input PostInput {
    title: String!
    body: String!
    userId: ID!
  }

  input CommentInput {
    name: String!
    email: String!
    body: String!
    postId: ID!
  }

  type Message {
    message: String!
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Message

    createComment(input: CommentInput): Comment
    updateComment(id: ID!, input: CommentInput): Comment
    deleteComment(id: ID!): Message
  }
`;
