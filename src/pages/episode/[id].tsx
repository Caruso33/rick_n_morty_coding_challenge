import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import Spinner from "../../components/Spinner"
import { GET_EPISODE } from "../../utils/graphql"

const EpisodeDetail = () => {
  const {
    query: { id },
  } = useRouter()

  const { loading, data = { episode: {} } } = useQuery(GET_EPISODE, {
    variables: {
      id,
    },
  })

  const {
    name = "",
    episode = "",
    characters = [],
    air_date = "",
    created = "",
  } = data?.episode

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
          className="flex flex-col text-center p-6 m-6 border-2 border-gray-500 rounded shadow-xl"
          data-testid="detail-wrapper"
        >
          <div className="text-2xl italic mt-3">Name</div>
          <div className="text-md">{name}</div>
          <div className="text-2xl italic mt-3">Episode</div>
          <div className="text-md">{episode}</div>
          <div className="text-2xl italic mt-3">First aired</div>
          <div className="text-md">{air_date}</div>
          <div className="text-2xl italic mt-3">Created</div>
          <div className="text-md">{created}</div>
          <div className="text-2xl italic mt-3">
            Appearing characters in the episode
          </div>
          <div className="text-xl mt-5">
            {characters
              .map((char: Record<string, any>) => char.name)
              .join(", ")}
          </div>
        </div>
      )}
    </>
  )
}
export default EpisodeDetail
