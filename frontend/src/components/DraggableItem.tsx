import { useDraggable } from '@dnd-kit/core'

type RenderComponentProps = {
  isDragging: boolean
}

type DraggableItemProps = {
  id: string
  renderComponent: (props: RenderComponentProps) => React.ReactNode
  className?: string
  disabled?: boolean
}

export const DraggableItem = ({
  id,
  renderComponent,
  className,
  disabled,
}: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  })

  return (
    <div
      className={`draggable select-none touch-none cursor-grab ${className ?? ''}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {renderComponent({ isDragging })}
    </div>
  )
}
