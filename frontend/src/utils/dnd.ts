import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export function handleReorder<T extends { id: string } | string>(
  event: DragEndEvent,
  items: T[],
  setItems: (items: T[]) => void,
) {
  const { active, over } = event
  if (!over) return

  const activeId = typeof active.id === 'string' ? active.id : String(active.id)
  const overId = typeof over.id === 'string' ? over.id : String(over.id)

  const oldIndex = items.findIndex(i => (typeof i === 'string' ? i : i.id) === activeId)

  const newIndex = items.findIndex(i => (typeof i === 'string' ? i : i.id) === overId)

  if (oldIndex !== newIndex && newIndex !== -1) {
    setItems(arrayMove(items, oldIndex, newIndex))
  }
}
