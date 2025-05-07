import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'
import { ListContainer } from './ListContainer'

export const CreateAnswerStudent = () => {
  const { options } = useQuestionFormStore()
  const [lists, setLists] = useState({
    left: options,
    right: []
  })
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    if (active.data.current?.list === over.data.current?.list) {
      const listKey = active.data.current?.list as keyof typeof lists
      const oldIndex = active.data.current?.index
      const newIndex = over.data.current?.index

      setLists(prev => ({
        ...prev,
        [listKey]: arrayMove(prev[listKey], oldIndex, newIndex)
      }))
    }
    else {
      const fromList = active.data.current?.list as keyof typeof lists
      const toList = over.data.current?.list as keyof typeof lists
      const itemIndex = active.data.current?.index

      setLists(prev => {
        const newFromList = [...prev[fromList]]
        const newToList = [...prev[toList]]
        const [movedItem] = newFromList.splice(itemIndex, 1)

        return {
          ...prev,
          [fromList]: newFromList,
          [toList]: [...newToList, movedItem]
        }
      })
    }

    setActiveId(null)
  }

  return (
    <div className="w-10/12 mx-auto">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between">
          <SortableContext
            items={lists.left}
            strategy={verticalListSortingStrategy}
          >
            <ListContainer title="Opciones" items={lists.left} listName="left" />
          </SortableContext>

          <SortableContext
            items={lists.right}
            strategy={verticalListSortingStrategy}
          >
            <ListContainer title="Respuesta" items={lists.right} listName="right" />
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white border-2 border-blue-500 rounded-lg px-4 py-2 shadow-xl">
              {lists.left.find(i => i === activeId) || lists.right.find(i => i === activeId)}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
