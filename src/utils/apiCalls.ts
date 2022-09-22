import apolloClient from "./apollo"
import { GET_USERS_USERNAME, UPDATE_USER } from "./graphql"

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, ...userFields } = getUserData?.users?.[0]
    if (userFields) {
      localStorage.setItem("user-data", JSON.stringify(userFields))
      onSuccess && onSuccess()
    }
  }

  return { getUserData, errors }
}

export async function updateUser(charId: string) {
  const userData =
    typeof window !== "undefined" && localStorage.getItem("user-data")
  const favoriteCharacters = userData && JSON.parse(userData)?.favorite_chars

  if (!userData || !charId) {
    return
  }

  console.log("Updating favorite Characters...")
  try {
    const newFavorites = favoriteCharacters.includes(+charId)
      ? favoriteCharacters.filter((id: number) => id !== +charId)
      : [...favoriteCharacters, +charId]

    const { errors } = await apolloClient.query({
      query: UPDATE_USER,
      variables: {
        username: JSON.parse(userData)?.username,
        // postgres list of integers have to be wrapped inside '{ }' not '[ ]'
        favoriteChars: `{${newFavorites.join()}}`,
      },
      context: { clientName: "hasura" },
    })
    if (errors) throw Error(errors?.[0]?.message)

    const { errors: getUserErrors } = await getUser(
      JSON.parse(userData)?.username
    )

    if (getUserErrors) throw Error(getUserErrors?.[0]?.message)
  } catch (e: any) {
    console.error(`Updating favorite Characters failed: ${e.message}`)
  }
}
