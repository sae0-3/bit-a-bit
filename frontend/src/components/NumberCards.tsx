import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import { useSolutionStore } from '../stores/solutions.store'
import { useEffect, useState, useRef } from 'react'

type NumberCardsProps = {
  number: string[]
  targetSequence?: string[]
}

export const NumberCards = ({ number, targetSequence = [] }: NumberCardsProps) => {
  const isEqualLength = number.length === targetSequence.length
  const { sequenceIds } = useSolutionStore()
  const [items, setItems] = useState<{ id: string, data: string }[]>([])
  const animationVersion = useRef(0)
  const shouldAnimate = !(targetSequence.length > 0 && isEqualLength)

  useEffect(() => {
    if (shouldAnimate) {
      animationVersion.current += 1
    }
  }, [sequenceIds, shouldAnimate])

  useEffect(() => {
    if (sequenceIds.length === number.length) {
      setItems(sequenceIds.map((id, i) => ({
        id,
        data: number[i]
      })));
    }
  }, [sequenceIds, number])

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center w-full">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const isMatch = isEqualLength && item.data === targetSequence[index]
          const uniqueKey = shouldAnimate ? `${item.id}-${animationVersion.current}` : item.id
          const delay = shouldAnimate ? index * 0.05 : 0

          return (
            <motion.div
              key={uniqueKey}
              initial={shouldAnimate ? {
                opacity: 0,
                y: 100,
                scale: 0.85
              } : false}
              animate={shouldAnimate ? {
                opacity: 1,
                y: 0,
                scale: 1
              } : false}
              exit={shouldAnimate ? {
                opacity: 0,
                y: -50,
                scale: 0.8
              } : {}}
              transition={shouldAnimate ? {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
                duration: 0.8,
                delay
              } : {}}
              layout={shouldAnimate}
              className={`relative flex items-center justify-center w-14 h-14 rounded-xl shadow-lg ${isMatch
                ? 'bg-gradient-to-br from-secondary-2 to-secondary-1 text-white'
                : 'bg-white/90 text-primary-dark border border-secondary-gray/30'
                }`}
            >
              <span className="text-lg font-bold">{item.data}</span>
              {isMatch && (
                <motion.div
                  initial={shouldAnimate ? { scale: 0, y: 10 } : false}
                  animate={shouldAnimate ? {
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: shouldAnimate ? 0.4 : 0
                    }
                  } : false}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-1 rounded-full flex items-center justify-center shadow-lg"
                >
                  <FaCheck className="text-primary-light text-xs" />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}