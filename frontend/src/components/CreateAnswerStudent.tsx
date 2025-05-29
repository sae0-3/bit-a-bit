import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { predefinedOption } from '../types/form-question'
import { DroppableContainer } from './DroppableContainer'
import { SortableListContainer } from './SortableListContainer'
import { handleDragEnd, handleDragStart } from '../utils/dndHandles'

type CreateAnswerStudentProps = {
  listAnswer: predefinedOption[];
  setListAnswer: React.Dispatch<React.SetStateAction<predefinedOption[]>>;
}

export const CreateAnswerStudent = (props: CreateAnswerStudentProps) => {
  const { predefinedOptions, getOptionById } = useQuestionFormStore()
  const [activeOpt, setActiveOpt] = useState<predefinedOption | null>(null)
  const [listOptions, setListOptions] = useState<predefinedOption[]>(predefinedOptions)
  const { listAnswer, setListAnswer } = props
  const sensors = useSensors()

  return (
    <div className="w-full">
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
            showActive: true,
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
    </div >
  )
}
