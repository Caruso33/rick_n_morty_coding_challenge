import { useQuery } from "@apollo/client"
import Image from "next/image"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
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
          className="flex flex-col max-w-max text-center mx-auto p-6 m-6 border-2 border-gray-500 rounded shadow-xl"
          data-testid="detail-wrapper"
        >
          <div className="text-2xl italic mt-3">Name</div>{" "}
          <div className="text-md">{name}</div>
          <div className="text-2xl italic mt-3">Gender</div>{" "}
          <div className="text-md">{gender}</div>
          <div className="text-2xl italic mt-3">Species</div>{" "}
          <div className="text-md">{species}</div>
          <div className="text-2xl italic mt-3">Status</div>{" "}
          <div className="text-md">{status}</div>
          <div className="text-2xl italic mt-3">Location</div>{" "}
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
