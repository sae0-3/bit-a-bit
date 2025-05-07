import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type SortableProps = {
  id: string
  value: string
  list: string
  index: number
}

export const SortableItem = ({
  id,
  value,
  list,
  index
}: SortableProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      list,
      index
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white border rounded-lg px-4 py-2 cursor-grab active:cursor-grabbing
        ${isDragging ? 'shadow-lg border-blue-500' : 'border-gray-300'}`}
    >
      {value}
    </div>
  )
}
