import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { DraggableSortableItem } from './DraggableSortableItem'

type Item = {
  id: string
  value: string
}

type RenderComponentProps = Item & {
  isDragging: boolean
}

type SortableListContainerProps = {
  items: Item[]
  renderComponent: (props: RenderComponentProps) => React.ReactNode
  className?: string
}

export const SortableListContainer = (props: SortableListContainerProps) => {
  const { items, renderComponent, className } = props

  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className={className ?? ''}>
        {items.map(({ id, value }) => (
          <DraggableSortableItem
            key={id}
            id={id}
            renderComponent={({ isDragging }) => (
              renderComponent({ id, value, isDragging })
            )}
          />
        ))}
      </div>
    </SortableContext>
  )
}
