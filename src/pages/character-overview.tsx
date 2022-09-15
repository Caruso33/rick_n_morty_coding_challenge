import { useQuery } from "@apollo/client"
import type { NextPage } from "next"
import Image from "next/image"
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

  console.log(data)

  return (
    <>
      <Header />

      <Pagination
        current={currentPage}
        onPrev={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
        onNext={() =>
          setCurrentPage(
            currentPage === data?.info?.pages ? currentPage : currentPage + 1
          )
        }
      />

      {loading && <Spinner />}

      {!loading && (
        <div className="container mx-auto grid gap-3 pt-3 mt-5 text-center md:grid-cols-3 lg:w-2/3">
          {data?.characters?.results?.map((char: Record<string, any>) => {
            return (
              <Card
                key={char.id}
                name={char.name}
                content={
                  <Image
                    className="mt-5"
                    src={char.image}
                    alt={`profile image of ${char.name}`}
                    height={200}
                    width={200}
                  />
                }
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default CharacterOverview
