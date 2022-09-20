import apolloClient from "./apollo"
import { GET_USERS_USERNAME } from "./graphql"

export async function getUser(username: string, onSuccess?: () => void) {
  const { data: getUserData, errors } = await apolloClient.query({
    query: GET_USERS_USERNAME,
    variables: {
      username,
    },
    context: { clientName: "hasura" },
  })

  if (getUserData?.users?.length !== 0) {
    console.log("Found user")

    const { __typename, ...userFields } = getUserData?.users?.[0]
    if (userFields) {
      localStorage.setItem("user-data", JSON.stringify(userFields))
      onSuccess && onSuccess()
    }
  }

  return { getUserData, errors }
}
