import Link from "next/link"
import { GiPlagueDoctorProfile } from "react-icons/gi"
// import { MdLocalMovies } from "react-icons/md"
import Image from "next/image"
import { AiFillHome } from "react-icons/ai"

const Header = () => {
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
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
            <a>
              <GiPlagueDoctorProfile className="text-3xl" />
            </a>
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
