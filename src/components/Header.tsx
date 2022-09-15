import Link from "next/link"
import { GiPlagueDoctorProfile } from "react-icons/gi"
// import { MdLocalMovies } from "react-icons/md"
import Image from "next/image"
import { AiFillHome } from "react-icons/ai"

const Header = () => {
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
      <Link className="text-3xl font-bold leading-none" href="/">
        <Image
          height={80}
          width={300}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="rick and morty svg logo"
        />
      </Link>

      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-blue-600 p-3">
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>

      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li className="cursor-pointer">
          <Link className="text-sm text-gray-400 hover:text-gray-500" href="/">
            {/* Home */}
            <AiFillHome className="text-3xl" />
          </Link>
        </li>

        <li className="text-gray-300">
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
        </li>

        <li className="cursor-pointer">
          <Link
            className="text-sm text-blue-600 font-bold"
            href="/character-overview"
          >
            {/* Character Overview */}
            <GiPlagueDoctorProfile className="text-3xl" />
          </Link>
        </li>
        {/* <li className="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Episode Overview
            <MdLocalMovies />
          </a>
        </li> */}
      </ul>
    </nav>
  )
}

export default Header
