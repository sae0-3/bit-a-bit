import { useDroppable } from '@dnd-kit/core'
import { LuTrash } from 'react-icons/lu'

export const TrashBin = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash-bin',
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center w-full border-2 border-dashed p-2 ${isOver ? 'bg-red-200' : ''}`}
    >
      <LuTrash className="text-2xl" />
    </div>
  )
}
