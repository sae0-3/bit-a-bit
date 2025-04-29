import {
  DndContext,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { Dispatch, SetStateAction, useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { DraggableValue } from './DraggableValue'
import { TrashBin } from './TrashBin'

type OptionsProps = {
  values: string[]
  setValues: Dispatch<SetStateAction<string[]>>
}

export const Options = ({ values, setValues }: OptionsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event

    if (over?.id === 'trash-bin') {
      const id = String(active.id)
      setValues(prev => prev.filter(value => value !== id))
    }
  }

  const sensors = useSensors()

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        setActiveId(String(event.active.id))
      }}
      onDragEnd={(event: DragEndEvent) => {
        handleDragEnd(event)
        setActiveId(null)
      }}
    >
      <div className="flex flex-col w-10/12">
        <div className={`flex gap-2 flex-wrap justify-center ${values.length > 0 ? 'mb-4' : ''}`}>
          {values.map(value => (
            <DraggableValue
              key={value}
              id={value}
              label={value}
            />
          ))}
        </div>


        <TrashBin />

        <DragOverlay>
          {activeId ? (
            <DraggableValue
              id={activeId}
              label={activeId}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
