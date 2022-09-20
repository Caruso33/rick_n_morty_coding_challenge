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
})

const hasuraLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
})

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "hasura",
    hasuraLink,
    rickMortyLink
  ),
  cache: new InMemoryCache(),
  defaultOptions,
})

export default apolloClient
