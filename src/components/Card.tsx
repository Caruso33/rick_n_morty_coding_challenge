import { FaStar, FaRegStar } from "react-icons/fa"

type CardProps = {
  id?: string
  name: string
  description?: string
  content?: string | React.ReactNode
  isFavorite?: boolean | null
  onClick?: () => void
  onFavoriteClick?: (charId: string) => void
  updating?: boolean
}

const Card = ({
  id,
  name,
  description,
  content,
  isFavorite,
  onFavoriteClick,
  onClick,
  updating,
}: CardProps) => {
  return (
    <section
      onClick={onClick}
      className="relative flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 cursor-pointer"
      data-testid={`card-${name}`}
    >
      {typeof isFavorite == "boolean" && (
        <button
          className={`absolute top-3 right-3 text-2xl motion-safe:hover:scale-150 hover:border-2 hover:rounded ${
            isFavorite
              ? "text-yellow-500 hover:text-gray-500"
              : "text-gray-500 hover:text-yellow-500"
          }`}
          onClick={(e) => {
            if (!id) return

            e.stopPropagation()
            onFavoriteClick && onFavoriteClick(id)
          }}
          disabled={updating}
        >
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      )}

      <h2 className="text-lg text-gray-700">{name}</h2>
      {description && (
        <p className="mt-5 text-sm text-gray-600">{description}</p>
      )}
      {content}
    </section>
  )
}

export default Card
