import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiFillHome } from "react-icons/ai"
import { GiPlagueDoctorProfile } from "react-icons/gi"
import { MdLocalMovies } from "react-icons/md"
import { getUser } from "../utils/apiCalls"
import apolloClient from "../utils/apollo"
import { CREATE_USER } from "../utils/graphql"
import Spinner from "./Spinner"

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // check if localStorage user exists
    const userData =
      typeof window !== "undefined" && localStorage.getItem("user-data")

    if (userData) {
      console.log("Found local user data, using it")
      setUsername(JSON.parse(userData)?.username)
      setIsLoggedIn(true)
    }
  }, [])

  async function onLogin() {
    if (!username) {
      setHasError(true)
      return
    }

    setHasError(false)
    console.log("Checking users in db with this username...")

    try {
      setLoading(true)

      const { getUserData } = await getUser(username, () => setIsLoggedIn(true))

      if (getUserData?.users?.length === 0) {
        console.log("No user with this Username found. Creating new user...")

        const { data: createUserData } = await apolloClient.query({
          query: CREATE_USER,
          variables: {
            username,
          },
          context: { clientName: "hasura" },
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __typename, ...userFields } = createUserData?.insert_users_one
        if (userFields) {
          localStorage.setItem("user-data", JSON.stringify(userFields))
          setIsLoggedIn(true)
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(`Something went wrong logging in: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  function onLogout() {
    localStorage.removeItem("user-data")
    setIsLoggedIn(false)
  }

  return (
    <nav
      className="relative px-4 py-4 flex justify-between items-center bg-white"
      data-testid="header-wrapper"
    >
      <Link className="text-3xl font-bold leading-none" href="/">
        <a>
          <Image
            height={80}
            width={300}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
            alt="rick and morty svg logo"
          />
        </a>
      </Link>

      <ul className="flex items-center space-x-6 mr-6">
        <li className="cursor-pointer">
          <Link className="text-sm text-gray-400 hover:text-gray-500" href="/">
            {/* Home */}
            <a>
              <AiFillHome className="text-3xl" />
            </a>
          </Link>
        </li>

        <li className="text-gray-300">
          <Separator />
        </li>

        <li className="cursor-pointer">
          <Link
            className="text-sm text-blue-600 font-bold"
            href="/character-overview"
          >
            {/* Character Overview */}
            <a>
              <GiPlagueDoctorProfile className="text-3xl" />
            </a>
          </Link>
        </li>

        <li className="text-gray-300">
          <Separator />
        </li>

        <li>
          <Link
            className="text-sm text-blue-600 font-bold"
            href="/episode-overview"
          >
            <a>
              {/* Episode Overview */}
              <MdLocalMovies className="text-3xl" />
            </a>
          </Link>
        </li>
      </ul>

      <div className="w-64">
        {!isLoggedIn ? (
          <div className="flex justify-between border-2 border-gray-500 rounded shadow-xl p-3 mr-6">
            <input
              type="text"
              className={`w-full mr-2 border-2 outline-none focus:outline-none focus:border-gray-300 ${
                hasError ? "border-rose-600" : ""
              }`}
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setHasError(false)
                setUsername(e.target.value)
              }}
            />

            <button
              className="rounded-full px-2 py-1 text-white bg-gray-500 hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={onLogin}
              disabled={loading}
            >
              {loading ? <Spinner borderColor="border-white-200" /> : "Login"}
            </button>
          </div>
        ) : (
          <div className="mr-6 flex justify-end">
            <button
              className="rounded-full px-2 py-1 text-white bg-gray-500 hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={onLogout}
              disabled={loading}
            >
              {loading ? (
                <Spinner borderColor="border-white-200" />
              ) : (
                `Logout ${username}`
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header

function Separator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4 current-fill"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  )
}
