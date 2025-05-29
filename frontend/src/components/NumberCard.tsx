
type NumberCardProps = {
  number: string;
}

export const NumberCard = ({ number }: NumberCardProps) => {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md">
      <span className="text-xl font-semibold text-gray-800">
        {number}
      </span>
    </div>
  )
}
