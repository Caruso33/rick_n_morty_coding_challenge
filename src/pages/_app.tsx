import { ApolloProvider } from "@apollo/client"
import type { AppType } from "next/dist/shared/lib/utils"
import apolloClient from "src/utils/apollo"
import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
