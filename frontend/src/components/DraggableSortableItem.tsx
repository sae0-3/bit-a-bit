import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type RenderComponentProps = {
  isDragging: boolean
}

type DraggableSortableItemProps = {
  id: string
  renderComponent: (props: RenderComponentProps) => React.ReactNode
  className?: string
}

export const DraggableSortableItem = ({
  id,
  renderComponent,
  className,
}: DraggableSortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`select-none touch-none cursor-grab ${className ?? ''}`}
      {...attributes}
      {...listeners}
    >
      {renderComponent({ isDragging })}
    </div>
  )
}
