import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { useGetPatternsAvailable } from '../hooks/usePatterns'
import { useSensors } from '../hooks/useSensors'
import { useSolutionStore } from '../stores/solutions.store'
import { Item } from '../types/solutions'
import { DraggableItem } from './DraggableItem'
import { DroppableContainer } from './DroppableContainer'
import { SortableListContainer } from './SortableListContainer'

export const CreateSolution = () => {
  const { data: patterns, isLoading, isError } = useGetPatternsAvailable()
  const {
    answerList,
    addToAnswer,
    removeFromAnswer,
    reorderAnswer,
    clearAnswer,
  } = useSolutionStore()
  const sensors = useSensors()
  const [activeOpt, setActiveOpt] = useState<Item | null>(null)

  const patternsParsed = patterns?.map(pattern => ({
    id: pattern.code,
    value: pattern.name,
  })) || []
  const optionsList: Item[] = patternsParsed

  useEffect(() => clearAnswer(), [])

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = String(event.active.id)
    const itemInOptions = optionsList.find(item => item.id === activeId)
    const itemInAnswer = answerList.find(item => item.id === activeId)
    setActiveOpt(itemInOptions || itemInAnswer || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveOpt(null)
      return
    }

    const activeId = String(active.id)
    const overId = String(over.id)

    if (overId === 'options-list' || overId === 'answer-list') {
      const itemInAnswer = answerList.find(item => item.id === activeId)

      if (itemInAnswer && overId === 'options-list') {
        removeFromAnswer(activeId)
      } else if (!itemInAnswer && overId === 'answer-list') {
        const itemInOptions = optionsList.find(item => item.id === activeId)
        if (itemInOptions) {
          const newItem = { ...itemInOptions, id: `${itemInOptions.id}-${Date.now()}` }
          addToAnswer(newItem)
        }
      }
    } else {
      const itemInAnswer = answerList.find(item => item.id === activeId)

      if (itemInAnswer) {
        const oldIndex = answerList.findIndex(item => item.id === activeId)
        const newIndex = answerList.findIndex(item => item.id === overId)

        if (oldIndex !== -1 && newIndex !== -1) {
          reorderAnswer(oldIndex, newIndex)
        }
      }
    }

    setActiveOpt(null)
  }

  if (isLoading) return <div>Cargando patrones...</div>
  if (isError) return <div>Error al cargar patrones</div>
  if (!patterns) return <div>No se encontraron patrones</div>

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
        <div className="w-full flex flex-col items-center justify-center gap-1 flex-1">
          <p className="font-semibold text-center text-lg">Patrones</p>

          <DroppableContainer
            id="options-list"
            className="w-full border rounded min-h-10 p-4 flex-1"
            renderComponent={() => (
              <div className="flex flex-col gap-2 h-full">
                {optionsList.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    renderComponent={({ isDragging }) => (
                      <p className={`border text-center p-1 rounded ${isDragging ? 'invisible' : ''}`}>
                        {item.value}
                      </p>
                    )}
                  />
                ))}
              </div>
            )}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-1 flex-1">
          <p className="font-semibold text-center text-lg">Respuesta</p>

          <DroppableContainer
            id="answer-list"
            className="w-full border rounded min-h-10 p-4 flex-1"
            renderComponent={() => (
              <SortableListContainer
                className="flex flex-col gap-2 h-full"
                items={answerList}
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
  )
}
