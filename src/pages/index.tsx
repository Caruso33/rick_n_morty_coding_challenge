import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Card from "../components/Card"

const Home: NextPage = () => {
  const router = useRouter()

  function navigateTo(url: string): void {
    router.push(url)
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Rick'n Morty" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Rick&apos;n Morty Info App
        </h1>

        <p className="text-2xl text-gray-700">
          Please select card to navigate to page
        </p>

        <div className="grid gap-3 pt-3 mt-5 text-center md:grid-cols-3 lg:w-2/3">
          <Card
            name="Character Overview"
            description="Dive into your favorite characters"
            onClick={() => navigateTo("/character-overview")}
          />
        </div>
      </main>
    </>
  )
}

export default Home
