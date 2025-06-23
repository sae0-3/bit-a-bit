import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

type NumberCardsProps = {
  number: string[]
  targetSequence?: string[]
}

export const NumberCards = ({ number, targetSequence = [] }: NumberCardsProps) => {
  const isEqualLength = number.length === targetSequence.length

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center w-full">
      {number.map((item, idx) => {
        const isMatching = isEqualLength && item === targetSequence[idx]

        return (
          <motion.div
            key={idx}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: idx * 0.01
            }}
            whileHover={{ scale: 1.05 }}
            className={`
              relative flex items-center justify-center w-14 h-14 rounded-xl shadow-lg
              transition-all duration-300 ease-out
              ${isMatching
                ? 'bg-gradient-to-br from-secondary-2 to-secondary-1 text-white shadow-secondary-1/30'
                : 'bg-white/90 text-primary-dark shadow-primary-dark/10 border border-secondary-gray/30'
              }
            `}
          >
            <span className="text-lg font-bold">
              {item}
            </span>

            {isMatching && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-1 rounded-full flex items-center justify-center shadow-lg"
              >
                <FaCheck className="text-primary-light text-xs" />
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
