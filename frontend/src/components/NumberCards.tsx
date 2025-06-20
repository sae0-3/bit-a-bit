import { motion } from 'framer-motion'

type NumberCardsProps = {
  number: string[]
  targetSequence?: string[]
}

export const NumberCards = ({ number, targetSequence = [] }: NumberCardsProps) => {
  const isEqualLength = number.length === targetSequence.length

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center w-full">
      {number.map((item, idx) => (
        <motion.div
          key={idx}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`
            flex items-center justify-center w-16 h-16 rounded-lg shadow-md
            ${isEqualLength && item === targetSequence[idx]
              ? 'bg-green-300/30'
              : 'bg-gray-200'}
            `}
        >
          <span className="text-xl font-semibold text-gray-800">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
