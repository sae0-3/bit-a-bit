import {
  DndContext,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { DraggableValue } from './DraggableValue'
import { TrashBin } from './TrashBin'

export const Options = () => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { options, removeOption } = useQuestionFormStore()
  const sensors = useSensors()

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event

    if (over?.id === 'trash-bin') {
      const id = String(active.id)
      removeOption(options.findIndex(opt => opt === id));
    }
  }

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
        <div className={`flex gap-2 flex-wrap justify-center ${options.length > 0 ? 'mb-4' : ''}`}>
          {options.map((value, index) => (
            <DraggableValue
              key={`${value}-${index}`}
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
