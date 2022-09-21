import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Card from "../components/Card"
import Header from "../components/Header"

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
            onClick={() => navigateTo("/character-overview")}
          />

          <Card
            name="Episode Overview"
            description="See all episodes"
            onClick={() => navigateTo("/episode-overview")}
          />
        </div>
      </main>
    </>
  )
}

export default Home
