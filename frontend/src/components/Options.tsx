import {
  DndContext,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { AddOptionModal } from './AddOptionModal'
import { DraggableValue } from './DraggableValue'
import { TrashBin } from './TrashBin'

export const Options = () => {
  const [viewModal, setviewModal] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors()
  const { options, addOption, removeOption } = useQuestionFormStore()

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event

    if (over?.id === 'trash-bin') {
      const id = String(active.id)
      removeOption(options.findIndex(opt => opt === id));
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center justify-center gap-1"
        onClick={() => setviewModal(true)}
      >
        <span className="text-center">Agregar opciones</span>
        <LuPlus />
      </button>

      {viewModal && (
        <AddOptionModal
          addOption={addOption}
          onClose={() => setviewModal(false)}
        />
      )}

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
        <div className="flex flex-col">
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
    </div>
  )
}
