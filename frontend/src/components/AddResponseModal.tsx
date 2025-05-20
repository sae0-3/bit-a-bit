import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from '@dnd-kit/core'
import { useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Option } from '../types/form-question'
import { handleReorder } from '../utils/dnd'
import { DroppableContainer } from './DroppableContainer'
import { SortableListContainer } from './SortableListContainer'

type AddResponseModalProps = {
  onClose: () => void
}

export const AddResponseModal: React.FC<AddResponseModalProps> = ({ onClose }) => {
  const { getOptionById, options, addResponse } = useQuestionFormStore()

  const [responseName, setResponseName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [listOptions, setListOptions] = useState<Option[]>(options)
  const [listAnswer, setListAnswer] = useState<Option[]>([])
  const [activeOpt, setActiveOpt] = useState<Option | null>(null)

  const sensors = useSensors()

  const handleAdd = () => {
    if (responseName.trim() === '') {
      setError("El nombre no puede estar vacío")
      return
    }
    if (listAnswer.length === 0) {
      setError("Debes agregar al menos una opción")
      return
    }

    addResponse({
      name: responseName,
      options: listAnswer,
    })

    onClose()
  }

  const handleDragStart = (event: DragStartEvent) => {
    const opt = getOptionById(String(event.active.id))
    setActiveOpt(opt ?? null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)

    if (overId === 'options-list' || overId === 'answer-list') {
      const fromOptions = listOptions.some(o => o.id === activeId)
      const fromAnswer = listAnswer.some(o => o.id === activeId)

      if (fromOptions && overId === 'answer-list') {
        const item = listOptions.find(o => o.id === activeId)!
        setListOptions(prev => prev.filter(o => o.id !== activeId))
        setListAnswer(prev => [...prev, item])
      } else if (fromAnswer && overId === 'options-list') {
        const item = listAnswer.find(o => o.id === activeId)!
        setListAnswer(prev => prev.filter(o => o.id !== activeId))
        setListOptions(prev => [...prev, item])
      }
    } else {
      if (listOptions.some(o => o.id === activeId)) {
        handleReorder<Option>(event, listOptions, setListOptions)
      } else {
        handleReorder<Option>(event, listAnswer, setListAnswer)
      }
    }

    setActiveOpt(null)
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-xl">
        <div className={`w-full ${error ? '' : 'mb-4'} flex flex-col justify-center items-center`}>
          <p className="font-semibold text-lg mb-2">Agregar Respuesta</p>
          <input
            type="text"
            placeholder="Ingrese el nombre de la respuesta"
            className="mt-2 w-full h-10 border border-gray-300 rounded px-3"
            value={responseName}
            onChange={e => setResponseName(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="my-4">
          <p className="text-sm text-gray-600 mb-2">
            Arrastra las opciones para formar tu respuesta:
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full flex flex-col items-center justify-center gap-4 flex-1">
                <p className="font-semibold text-center text-lg">Opciones</p>
                <DroppableContainer
                  id="options-list"
                  className="w-full border rounded min-h-10 p-4 flex-1"
                  renderComponent={() => (
                    <SortableListContainer
                      className="flex flex-col gap-2 h-full"
                      items={listOptions}
                      renderComponent={({ isDragging, value }) => (
                        <p className={`border text-center p-1 rounded ${isDragging ? 'invisible' : ''}`}>
                          {value}
                        </p>
                      )}
                    />
                  )}
                />
              </div>

              <div className="w-full flex flex-col items-center justify-center gap-4 flex-1">
                <p className="font-semibold text-center text-lg">Respuesta</p>
                <DroppableContainer
                  id="answer-list"
                  className="w-full border rounded min-h-10 p-4 flex-1"
                  renderComponent={() => (
                    <SortableListContainer
                      className="flex flex-col gap-2 h-full"
                      items={listAnswer}
                      renderComponent={({ isDragging, value }) => (
                        <p className={`border text-center p-1 rounded ${isDragging ? 'invisible' : ''}`}>
                          {value}
                        </p>
                      )}
                    />
                  )}
                />
              </div>
            </div>

            {activeOpt?.value && (
              <DragOverlay>
                <p className="border text-center p-1 rounded cursor-grab">
                  {activeOpt.value}
                </p>
              </DragOverlay>
            )}
          </DndContext>
        </div>

        <div className="flex justify-around mt-6">
          <button
            className="bg-primary-dark text-white rounded px-4 py-2 hover:cursor-pointer"
            onClick={handleAdd}
          >
            Agregar
          </button>
          <button
            className="bg-primary-dark text-white rounded px-4 py-2 hover:cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}