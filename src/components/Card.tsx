type CardProps = {
  name: string
  description?: string
  content?: string | React.ReactNode
  onClick?: () => void
}

const Card = ({ name, description, content, onClick }: CardProps) => {
  return (
    <section
      onClick={onClick}
      className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 cursor-pointer"
    >
      <h2 className="text-lg text-gray-700">{name}</h2>

      {description && (
        <p className="mt-5 text-sm text-gray-600">{description}</p>
      )}

      {content}
    </section>
  )
}

export default Card
