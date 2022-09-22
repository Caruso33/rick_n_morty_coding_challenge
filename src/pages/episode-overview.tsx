import { useQuery } from "@apollo/client"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import Card from "../components/Card"
import Header from "../components/Header"
import Pagination from "../components/Pagination"
import Spinner from "../components/Spinner"
import { GET_EPISODES } from "../utils/graphql"

const EpisodeOverview: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, data } = useQuery(GET_EPISODES, {
    variables: {
      page: currentPage,
    },
  })

  const router = useRouter()

  function navigateTo(url: string): void {
    router.push(url)
  }

  return (
    <>
      <Header />

      <Pagination
        current={currentPage}
        onPrev={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
        onNext={() =>
          setCurrentPage(
            currentPage === data?.episodes?.info?.pages
              ? currentPage
              : currentPage + 1
          )
        }
        pages={data?.episodes?.info?.pages}
      />

      {loading && (
        <div className="pt-3 mt-5">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div
          className="container mx-auto grid gap-3 pt-3 mt-5 text-center md:grid-cols-3 lg:w-2/3"
          data-testid="episode-card-wrapper"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.episodes?.results?.map((episode: Record<string, any>) => {
            return (
              <Card
                key={episode.id}
                id={episode.id}
                name={episode.name}
                description={episode.episode}
                content={
                  <div className="mt-5">First aired: {episode.air_date}</div>
                }
                onClick={() => navigateTo(`/episode/${episode.id}`)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default EpisodeOverview
