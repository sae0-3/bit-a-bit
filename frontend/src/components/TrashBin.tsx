import { LuTrash } from 'react-icons/lu'
import { DroppableContainer } from './DroppableContainer'

export const TrashBin = () => {
  return (
    <DroppableContainer
      id="trash-bin"
      renderComponent={({ isOver }) => (
        <div className={`flex items-center justify-center border-2 p-1 border-dashed ${isOver ? 'bg-red-200' : ''}`}>
          <LuTrash className="text-2xl" />
        </div>
      )}
    />
  )
}
