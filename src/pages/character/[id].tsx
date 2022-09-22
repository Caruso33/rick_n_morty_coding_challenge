import { useQuery } from "@apollo/client"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
import { updateUser } from "../../utils/apiCalls"
import { GET_CHARACTER } from "../../utils/graphql"

const CharacterDetail = () => {
  const {
    query: { id },
  } = useRouter()

  const { loading, data = { character: {} } } = useQuery(GET_CHARACTER, {
    variables: {
      id,
    },
  })

  const [updating, setUpdating] = useState(false)

  const userData =
    typeof window !== "undefined" && localStorage.getItem("user-data")
  const favoriteCharacters = userData && JSON.parse(userData)?.favorite_chars

  const isFavorite = favoriteCharacters?.includes(id && +id)

  async function onFavoriteClick() {
    if (!id) return

    setUpdating(true)

    await updateUser(id as string)

    setUpdating(false)
  }

  const {
    name = "",
    episode: episodes = [],
    gender = "",
    image = "",
    location = {},
    species = "",
    status = "",
  } = data?.character

  return (
    <>
      <Header />

      {loading && (
        <div className="pt-3 mt-5">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div
          className="relative flex flex-col max-w-max text-center mx-auto p-6 m-6 border-2 border-gray-500 rounded shadow-xl"
          data-testid="detail-wrapper"
        >
          {typeof isFavorite == "boolean" && (
            <button
              className={`absolute top-3 right-3 text-4xl motion-safe:hover:scale-150 hover:border-2 hover:rounded ${
                isFavorite
                  ? "text-yellow-500 hover:text-gray-500"
                  : "text-gray-500 hover:text-yellow-500"
              }`}
              onClick={onFavoriteClick}
              disabled={updating}
            >
              {isFavorite ? <FaStar /> : <FaRegStar />}
            </button>
          )}
          <div className="text-2xl italic mt-3">Name</div>
          <div className="text-md">{name}</div>
          <div className="text-2xl italic mt-3">Gender</div>
          <div className="text-md">{gender}</div>
          <div className="text-2xl italic mt-3">Species</div>
          <div className="text-md">{species}</div>
          <div className="text-2xl italic mt-3">Status</div>
          <div className="text-md">{status}</div>
          <div className="text-2xl italic mt-3">Location</div>
          <div className="text-md">{location?.name}</div>
          <div className="text-xl mt-5">
            Appeared in {episodes.length} episode(s)
          </div>
          <div className="mt-5">
            {image && (
              <Image
                src={image}
                alt={`profile image of ${name}`}
                height={400}
                width={400}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default CharacterDetail
