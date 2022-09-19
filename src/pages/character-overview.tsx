import { useQuery } from "@apollo/client"
import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Card from "../components/Card"
import Header from "../components/Header"
import Pagination from "../components/Pagination"
import Spinner from "../components/Spinner"
import { GET_CHARACTERS } from "../utils/graphql"

const CharacterOverview: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, data } = useQuery(GET_CHARACTERS, {
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
            currentPage === data?.characters?.info?.pages
              ? currentPage
              : currentPage + 1
          )
        }
        pages={data?.characters?.info?.pages}
      />

      {loading && (
        <div className="pt-3 mt-5">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="container mx-auto grid gap-3 pt-3 mt-5 text-center md:grid-cols-3 lg:w-2/3">
          {data?.characters?.results?.map((char: Record<string, any>) => {
            return (
              <Card
                key={char.id}
                name={char.name}
                content={
                  <div className="mt-5">
                    <Image
                      src={char.image}
                      alt={`profile image of ${char.name}`}
                      height={200}
                      width={200}
                    />
                  </div>
                }
                onClick={() => navigateTo(`/character/${char.id}`)}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default CharacterOverview
