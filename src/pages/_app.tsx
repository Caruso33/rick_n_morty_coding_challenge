import "../styles/globals.css"
import type { AppType } from "next/dist/shared/lib/utils"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
