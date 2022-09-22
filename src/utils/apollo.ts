import fetch from "cross-fetch"
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  DefaultOptions,
} from "@apollo/client"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
}

const rickMortyLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
  fetch,
})

const hasuraLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
  fetch,
})

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "hasura",
    hasuraLink,
    rickMortyLink
  ),
  cache: new InMemoryCache(),
  defaultOptions,
  ssrMode: true,
})

export default apolloClient
