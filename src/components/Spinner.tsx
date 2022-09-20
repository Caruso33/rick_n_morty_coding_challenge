type SpinnerProps = {
  innerClassName?: string
}

const Spinner = ({ innerClassName = "" }: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center" data-testid="spinner">
      <div
        className={`w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin ${innerClassName}`}
      ></div>
    </div>
  )
}

export default Spinner
