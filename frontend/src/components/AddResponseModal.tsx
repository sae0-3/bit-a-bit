import {
  DndContext,
  DragOverlay,
  pointerWithin,
} from '@dnd-kit/core'
import { useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { predefinedOption } from '../types/form-question'
import { DroppableContainer } from './DroppableContainer'
import { SortableListContainer } from './SortableListContainer'
import { handleDragEnd, handleDragStart } from '../utils/dndHandles'
import { applyNumberOperation } from '../utils/optionFunction'

type AddResponseModalProps = {
  onClose: () => void
}

export const AddResponseModal: React.FC<AddResponseModalProps> = ({ onClose }) => {
  const { getOptionById, addAnswer, predefinedOptions, initialNumber, setResultNumber } = useQuestionFormStore()

  const [responseName, setResponseName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [listOptions, setListOptions] = useState<predefinedOption[]>(predefinedOptions)
  const [listAnswer, setListAnswer] = useState<predefinedOption[]>([] as predefinedOption[])
  const [activeOpt, setActiveOpt] = useState<predefinedOption | null>(null)

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

    addAnswer({
      name: responseName,
      options: listAnswer,
    })

    let numberResponse = initialNumber
    for (let i = 0; i < listAnswer.length; i++) {
      numberResponse = applyNumberOperation(
        numberResponse,
        listAnswer[i],
      )
    }
    setResultNumber(numberResponse)
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
            onDragStart={(event) =>
              handleDragStart({
                event,
                setActiveOpt,
                getOptionById,
              })
            }
            onDragEnd={(event) =>
              handleDragEnd({
                event,
                listOptions,
                listAnswer,
                setListAnswer,
                setListOptions,
                setActiveOpt,
                staticOptions: true,
              })
            }
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