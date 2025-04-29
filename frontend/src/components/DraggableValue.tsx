import { useDraggable } from '@dnd-kit/core'

type DraggableValueProps = {
  id: string
  label: string
}

export const DraggableValue = ({ id, label }: DraggableValueProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`draggable p-2 border select-none touch-none border-primary-dark rounded-md cursor-grab ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {label}
    </div>
  )
}
