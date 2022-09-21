import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Card from "../components/Card"
import Header from "../components/Header"
import Image from "next/image"

const Home: NextPage = () => {
  const router = useRouter()

  function navigateTo(url: string): void {
    router.push(url)
  }

  return (
    <>
      <Head>
        <title>Rick&apos;n Morty App</title>
        <meta name="description" content="Rick'n Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Rick&apos;n Morty App
        </h1>

        <p className="text-2xl text-gray-700">
          Please select card to navigate to page
        </p>

        <div
          className="flex justify-between gap-12 pt-3 mt-12 text-center md:grid-cols-3 lg:w-2/3"
          data-testid="card-wrapper"
        >
          <Card
            name="Character Overview"
            description="Dive into your favorite characters"
            content={
              <div className="mt-5">
                {Array.from({ length: 5 })
                  .map((_, i) => i + 1)
                  .map((i) => {
                    const url =
                      "https://rickandmortyapi.com/api/character/avatar/"
                    const suffix = ".jpeg"
                    const imageUri = `${url}${i}${suffix}`

                    return (
                      <Image
                        key={imageUri}
                        src={imageUri}
                        alt={`profile image of ${imageUri}`}
                        height={50}
                        width={50}
                      />
                    )
                  })}
              </div>
            }
            onClick={() => navigateTo("/character-overview")}
          />

          <Card
            name="Episode Overview"
            description="See all episodes"
            content={
              <div className="flex mt-5">
                {[
                  "Pilot (S01E01)",
                  "Lawnmover Dog (S01E02)",
                  "Anatomy Park (S01E03)",
                ].join(", ")}
                ...
              </div>
            }
            onClick={() => navigateTo("/episode-overview")}
          />
        </div>
      </main>
    </>
  )
}

export default Home
