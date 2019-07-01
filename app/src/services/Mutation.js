import gql from 'graphql-tag'

export const CREATE_POST = gql`
  mutation post($title: String!, $userId: ID!, $body: String!) {
    createPost(input: { title: $title, userId: $userId, body: $body }) {
      id
      title
      body
      userId
      author {
        name
      }
    }
  }
`
