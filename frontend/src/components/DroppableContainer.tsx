import { useDroppable } from '@dnd-kit/core'

type RenderComponentProps = {
  isOver: boolean
}

type DroppableContainerProps = {
  id: string
  renderComponent: (props: RenderComponentProps) => React.ReactNode
  className?: string
}

export const DroppableContainer = ({
  id,
  renderComponent,
  className,
}: DroppableContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={className}
    >
      {renderComponent({ isOver })}
    </div>
  )
}
