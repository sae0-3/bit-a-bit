import { pointerWithin, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'

import { useSensors } from '../hooks/useSensors'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Option } from '../types/form-question'
import { handleReorder } from '../utils/dnd'
import { DroppableContainer } from './DroppableContainer'
import { SortableListContainer } from './SortableListContainer'

export const CreateAnswerStudent = () => {
  const { options, getOptionById } = useQuestionFormStore()
  const [activeOpt, setActiveOpt] = useState<Option | null>(null)
  const [listOptions, setListOptions] = useState<Option[]>(options)
  const [listAnswer, setListAnswer] = useState<Option[]>([])
  const sensors = useSensors()

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
    <div className="w-full">
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
  )
}
