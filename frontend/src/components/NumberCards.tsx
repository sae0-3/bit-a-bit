import { motion } from 'framer-motion'

type NumberCardsProps = {
  number: string[]
}

export const NumberCards = ({ number }: NumberCardsProps) => {

  return (
    <div className="flex flex-wrap gap-4 pt-2 justify-center items-center w-full p-4">
      {number.map((item, idx) => (
        <motion.div
          key={idx}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg shadow-md"
        >
          <span className="text-xl font-semibold text-gray-800">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
