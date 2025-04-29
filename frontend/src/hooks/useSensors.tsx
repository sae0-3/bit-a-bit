import {
  PointerSensor,
  TouchSensor,
  useSensors as dndSensors,
  useSensor
} from '@dnd-kit/core'

export const useSensors = () => {
  return dndSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      }
    })
  )
}
