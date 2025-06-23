import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { BsGrid3X3Gap, BsLightbulb } from 'react-icons/bs'
import { FaGripVertical, FaPlus, FaTrash } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'

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

  if (isLoading) return (
    <div className="flex items-center gap-3 p-4 bg-secondary-1/10 rounded-xl">
      <div className="w-5 h-5 border-2 border-secondary-1 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium text-primary-dark">Cargando patrones...</span>
    </div>
  )

  if (isError) return (
    <div className="flex items-center gap-3 p-4 bg-accent-red/10 rounded-xl border border-accent-red/20">
      <div className="w-5 h-5 bg-accent-red/20 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-accent-red">!</span>
      </div>
      <span className="text-sm font-medium text-accent-red">Error al cargar patrones</span>
    </div>
  )

  if (!patterns) return (
    <div className="flex items-center gap-3 p-4 bg-secondary-gray/20 rounded-xl">
      <BsGrid3X3Gap className="w-5 h-5 text-secondary-gray" />
      <span className="text-sm font-medium text-primary-dark/60">No se encontraron patrones</span>
    </div>
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-primary-dark/60 bg-secondary-1/5 rounded-lg p-3">
          <HiSparkles className="w-4 h-4 text-secondary-1" />
          <span>Arrastra los patrones desde la izquierda hacia la zona de respuesta</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-secondary-1/20 rounded-lg flex items-center justify-center">
                <BsGrid3X3Gap className="w-3 h-3 text-secondary-1" />
              </div>
              <h4 className="font-semibold text-sm text-primary-dark">Patrones Disponibles</h4>
              <span className="text-xs text-primary-dark/50 bg-secondary-gray/20 px-2 py-1 rounded-full">
                {optionsList.length}
              </span>
            </div>

            <DroppableContainer
              id="options-list"
              className="bg-gradient-to-br from-secondary-2/10 to-secondary-1/5 border border-secondary-1/20 rounded-xl p-3 min-h-[120px] transition-all duration-200 hover:border-secondary-1/30"
              renderComponent={() => (
                <div className="grid grid-cols-1 gap-2">
                  {optionsList.map((item) => (
                    <DraggableItem
                      key={item.id}
                      id={item.id}
                      renderComponent={({ isDragging }) => (
                        <div className={`
                          bg-white/80 backdrop-blur-sm border border-secondary-1/20 rounded-lg p-2 text-center text-sm font-medium text-primary-dark
                          hover:bg-white hover:border-secondary-1/40 hover:shadow-md cursor-grab active:cursor-grabbing
                          transition-all duration-200 flex items-center justify-center gap-2
                          ${isDragging ? 'opacity-50 rotate-2 scale-105' : 'hover:scale-102'}
                        `}>
                          <FaGripVertical className="w-3 h-3 text-secondary-gray opacity-50" />
                          <span>{item.value}</span>
                        </div>
                      )}
                    />
                  ))}
                </div>
              )}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-dark/20 rounded-lg flex items-center justify-center">
                <BsLightbulb className="w-3 h-3 text-primary-dark" />
              </div>
              <h4 className="font-semibold text-sm text-primary-dark">Secuencia de Respuesta</h4>
              <span className="text-xs text-primary-dark/50 bg-primary-dark/10 px-2 py-1 rounded-full">
                {answerList.length}
              </span>
              {answerList.length > 0 && (
                <button
                  onClick={clearAnswer}
                  className="ml-auto text-xs bg-accent-red/10 hover:bg-accent-red/20 text-accent-red px-2 py-1 rounded-lg transition-colors duration-200 flex items-center gap-1 hover:cursor-pointer"
                >
                  <FaTrash className="w-2 h-2" />
                  Limpiar
                </button>
              )}
            </div>

            <DroppableContainer
              id="answer-list"
              className={`
                bg-gradient-to-br from-primary-dark/5 to-secondary-1/10 border-2 border-dashed rounded-xl p-3 min-h-[120px]
                transition-all duration-200
                ${answerList.length > 0
                  ? 'border-primary-dark/30 bg-primary-dark/5'
                  : 'border-secondary-gray/40 hover:border-secondary-1/40'
                }
              `}
              renderComponent={() => (
                <div className="h-full">
                  {answerList.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-4">
                      <div className="w-10 h-10 bg-secondary-gray/20 rounded-full flex items-center justify-center mb-2">
                        <FaPlus className="w-4 h-4 text-secondary-gray" />
                      </div>
                      <p className="text-xs text-primary-dark/50 font-medium">Arrastra patrones aquí</p>
                      <p className="text-xs text-primary-dark/30">para crear tu secuencia</p>
                    </div>
                  ) : (
                    <SortableListContainer
                      className="space-y-2"
                      items={answerList}
                      renderComponent={({ isDragging, value }) => (
                        <div className={`
                          bg-white/90 backdrop-blur-sm border border-primary-dark/20 rounded-lg p-2 text-center text-sm font-medium text-primary-dark
                          shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing
                          transition-all duration-200 flex items-center justify-center gap-2
                          ${isDragging ? 'opacity-50 rotate-1 scale-105' : 'hover:scale-102'}
                        `}>
                          <FaGripVertical className="w-3 h-3 text-secondary-gray opacity-50" />
                          <span>{value}</span>
                        </div>
                      )}
                    />
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {activeOpt?.value && (
        <DragOverlay>
          <div className="bg-white border-2 border-secondary-1 rounded-lg p-2 text-center text-sm font-medium text-primary-dark shadow-xl cursor-grabbing transform rotate-2 scale-105">
            <div className="flex items-center justify-center gap-2">
              <FaGripVertical className="w-3 h-3 text-secondary-gray opacity-50" />
              <span>{activeOpt.value}</span>
            </div>
          </div>
        </DragOverlay>
      )}
    </DndContext>
  )
}
