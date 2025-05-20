import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import { useCallback, useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Option } from '../types/form-question'
import { AddOptionModal } from './AddOptionModal'
import { DraggableItem } from './DraggableItem'
import { TrashBin } from './TrashBin'

export const Options = () => {
  const [viewModal, setviewModal] = useState(false)
  const [activeOpt, setActiveOpt] = useState<Option | null>(null)
  const sensors = useSensors()
  const { options, addOption, removeOption, getOptionById } = useQuestionFormStore()

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const opt = getOptionById(String(event.active.id))
    setActiveOpt(opt ?? null)
  }, [getOptionById])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    if (event.over?.id === 'trash-bin') {
      removeOption(String(event.active.id))
    }

    setActiveOpt(null)
  }, [removeOption])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between flex-wrap items-center">
        <h2 className="font-semibold text-lg">Opciones:</h2>

        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center gap-1"
          onClick={() => setviewModal(true)}
        >
          <span className="text-center">Agregar</span>
          <LuPlus />
        </button>
      </div>

      {options.length === 0 ? (
        <p className="text-center italic text-gray-500 my-2">No existen opciones registradas</p>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col">
            <div className={`flex gap-2 flex-wrap justify-center ${options.length > 0 ? 'mb-4' : ''}`}>
              {options.map(({ id, value }) => (
                <DraggableItem
                  key={id}
                  id={id}
                  renderComponent={({ isDragging }) => (
                    <p className={`border border-primary-dark p-2 rounded-lg ${isDragging ? 'invisible' : ''}`}>
                      {value}
                    </p>
                  )}
                />
              ))}
            </div>

            {activeOpt?.value && (
              <DragOverlay>
                <p className="border border-primary-dark p-2 rounded-lg cursor-grab">
                  {activeOpt.value}
                </p>
              </DragOverlay>
            )}

            <TrashBin />
          </div>
        </DndContext>
      )}

      {viewModal && (
        <AddOptionModal
          addOption={addOption}
          onClose={() => setviewModal(false)}
        />
      )}
    </div>
  )
}
