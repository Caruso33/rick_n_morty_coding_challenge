import { gql } from "@apollo/client"

export const GET_CHARACTERS = gql`
  query GetChars($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }

      results {
        id
        name
        image
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query GetChar($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      image

      location {
        name
      }
      episode {
        id
      }
    }
  }
`

export const GET_USERS_PK = gql`
  query GetUsersByPK($id: Int) {
    users(where: { id: { _eq: $id } }) {
      id
      username
      favorite_chars
    }
  }
`

export const GET_USERS_USERNAME = gql`
  query GetUsersByUsername($username: String) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      favorite_chars
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String) {
    insert_users_one(object: { username: $username, favorite_chars: "{}" }) {
      id
      username
      favorite_chars
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $favoriteChars: String) {
    update_users(
      where: { username: { _eq: $username } }
      _set: { favorite_chars: $favoriteChars }
    ) {
      affected_rows
    }
  }
`
