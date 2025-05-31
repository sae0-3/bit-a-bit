import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { NumberCard } from "./NumberCard"
import { predefinedOption } from "../types/form-question"
import { applyNumberOperation, generateNumberItems } from "../utils/numberUtils"

type NumberCardsProps = {
  number: string[]
  answer?: predefinedOption[]
}

type NumberItem = {
  id: string
  value: string
}

export const NumberCards = ({ number, answer }: NumberCardsProps) => {
  const initialItems = useMemo(() => generateNumberItems(number), [number])
  const [numberItems, setNumberItems] = useState<NumberItem[]>(initialItems)

  useEffect(() => {
    if (answer && answer.length > 0) {
      let result = initialItems.map((item) => item.id)
      for (const op of answer) {
        result = applyNumberOperation(result, op)
      }
      const updatedItems = result.map((id) => {
        const item = initialItems.find((item) => item.id === id)
        return item ? { ...item } : { id: crypto.randomUUID(), value: "" }
      })
      setNumberItems(updatedItems)
    } else {
      setNumberItems(initialItems)
    }
  }, [initialItems, answer])

  return (
    <div className="flex flex-wrap gap-4 pt-2 justify-center items-center w-full p-4">
      {numberItems.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md"
        >
          <NumberCard number={item.value} />
        </motion.div>
      ))}
    </div>
  )
}
