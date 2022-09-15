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
