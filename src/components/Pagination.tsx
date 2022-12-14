import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

type PaginationProps = {
  onNext: () => void
  onPrev: () => void
  current: number
  pages?: number
}

const Pagination = ({ onNext, onPrev, current, pages }: PaginationProps) => {
  return (
    <div className="flex justify-center" data-testid="pagination">
      <ul className="flex items-center list-style-none">
        <li className="page-item" onClick={onPrev}>
          <a
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
            href="#"
          >
            <FaChevronLeft />
          </a>
        </li>

        <li className="page-item">
          <a
            className="w-24 text-center page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#"
          >
            {current} / {pages}
          </a>
        </li>

        <li className="page-item" onClick={onNext}>
          <a
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#"
          >
            <FaChevronRight />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
