import { SortableItem } from './SortableItem'

type ListContainerProps = {
  title: string
  items: string[]
  listName: string
}

export const ListContainer = ({ title, items, listName }: ListContainerProps) => (
  <div className="flex-1 border rounded-lg p-4 bg-gray-50 min-h-[200px]">
    <h3 className="font-bold text-lg mb-4 text-center">{title}</h3>

    <div className="space-y-2">
      {items.map((item, index) => (
        <SortableItem
          key={item}
          id={item}
          value={item}
          list={listName}
          index={index}
        />
      ))}
    </div>
  </div>
)
