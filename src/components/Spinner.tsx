type SpinnerProps = {
  borderColor?: string
}

const Spinner = ({ borderColor = "border-gray-900" }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center" data-testid="spinner">
      <div
        className={`w-8 h-8 border-b-2 rounded-full animate-spin ${borderColor}`}
      ></div>
    </div>
  )
}

export default Spinner
