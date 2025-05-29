
import { NumberCard } from "./NumberCard"

type NumberCardsProps = {
  number: string[]
}

export const NumberCards = ({ number }: NumberCardsProps) => {

  // const numbersID = new Map<string, string>()
  // while (numbersID.size < number.length) {
  //   numbersID.set(number[numbersID.size - 1], crypto.randomUUID())
  // }
  return (
    <div>
      <div className="flex flex-wrap gap-4 pt-2 justify-center items-center w-full p-4">
        {number.map((number, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md"
            >
              <NumberCard number={number} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
