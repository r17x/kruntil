import gql from 'graphql-tag'

export const GET_USERS = gql`
  {
    users {
      id
      name
      username
      email
      website
      phone
    }
  }
`

export const GET_USER = id => gql`
  {
    user(id: ${id}) {
      id
      name
      username
      email
      website
      phone
    }
  }
`

export const GET_POSTS = gql`
  {
    posts {
      id
      title
      body
      author {
        name
      }
    }
  }
`
export const GET_POSTS_USER = id => gql`
  {
    posts(userId: ${id}){
      id
      title
      body
      author {
        name
      }
    }
  }
`

export const GET_POST = id => gql`
  {
    post(id: ${id}){
      id
      title
      body
      comments {
        id
        name
        email
        body
        postId
      }
      author{
      name
      }
    }
  }
`
export const GET_ALBUMS = gql`
  {
    albums {
      id
      author {
        name
      }
      title
      userId
    }
  }
`
export const GET_ALBUMS_USER = id => gql`
  {
    albums(userId: ${id}){
      id
      author {
        name
      }
      title
      userId
    }
  }
`

export const GET_ALBUM = id => gql`
  {
    album(id: ${id}){
      id
      title
      userId
      author{name }
      photos {
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`
