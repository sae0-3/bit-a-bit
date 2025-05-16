import { useState, DragEvent, useRef } from "react"

type AddResponseModalProps = {
  addResponse: (response: { name: string, options: string[] }) => void
  onClose: () => void
  availableOptions: string[]
}

type OptionItem = {
  id: number
  text: string
  list: "options" | "response"
  order: number
}

export const AddResponseModal = ({ onClose, addResponse, availableOptions = [] }: AddResponseModalProps) => {
  const [error, setError] = useState<string | null>(null)
  const [responseName, setResponseName] = useState("")
  const idCounterRef = useRef(1)

  const [options, setOptions] = useState<OptionItem[]>(
    availableOptions.map((option, index) => ({
      id: idCounterRef.current++,
      text: option,
      list: "options",
      order: index
    }))
  )

  if (!onClose) return null

  const handleAdd = () => {
    if (responseName.trim() === '') {
      setError("El nombre no puede estar vacío")
      return
    }

    const selectedOptions = getList("response").map(item => item.text)

    addResponse({
      name: responseName,
      options: selectedOptions
    })

    onClose()
  }

  const getList = (list: "options" | "response"): OptionItem[] => {
    return options
      .filter(item => item.list === list)
      .sort((a, b) => a.order - b.order)
  }

  const startDrag = (evt: DragEvent<HTMLDivElement>, item: OptionItem) => {
    evt.dataTransfer.setData('itemID', item.id.toString())
  }

  const draggingOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault()
  }

  const onDrop = (evt: DragEvent<HTMLDivElement>, listName: "options" | "response") => {
    const itemID = parseInt(evt.dataTransfer.getData('itemID'))

    const draggedItem = options.find(item => item.id === itemID)
    if (!draggedItem) return
    if (draggedItem.list === listName) return

    const maxOrder = Math.max(
      ...options.filter(item => item.list === listName).map(item => item.order),
      -1
    ) + 1

    const newOptions = options.map(item => {
      if (item.id === itemID) {
        return { ...item, list: listName, order: maxOrder }
      }
      return item
    })
    setOptions(newOptions)
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-xl">
        <div className={`w-full ${error ? '' : 'mb-4'} flex flex-col justify-center items-center`}>
          <p className="font-semibold text-lg mb-2">Agregar Respuesta</p>
          <input
            type="text"
            placeholder="Ingrese el nombre de la respuesta"
            className="mt-2 w-full h-10 border border-gray-300 rounded px-3"
            value={responseName}
            onChange={(e) => setResponseName(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="my-4">
          <p className="text-sm text-gray-600 mb-2">Arrastra las opciones para formar tu respuesta:</p>

          <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between">
            <div className="w-full md:w-5/12 bg-gray-50 rounded-lg p-3">
              <h3 className="font-medium text-gray-700 mb-2">Opciones</h3>
              <div
                className="min-h-40 border border-dashed border-gray-300 rounded-lg p-2"
                onDragOver={(evt) => draggingOver(evt)}
                onDrop={(evt) => onDrop(evt, "options")}
              >
                {getList("options").map(item => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 mb-2 shadow-sm cursor-move"
                    draggable
                    onDragStart={(evt) => startDrag(evt, item)}
                    onDragOver={(evt) => draggingOver(evt)}
                    onDrop={(evt) => onDrop(evt, "options")}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-5/12 bg-gray-50 rounded-lg p-3">
              <h3 className="font-medium text-gray-700 mb-2">Respuesta</h3>
              <div
                className="min-h-40 border border-dashed border-gray-300 rounded-lg p-2"
                onDragOver={(evt) => draggingOver(evt)}
                onDrop={(evt) => onDrop(evt, "response")}
              >
                {getList("response").map(item => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 mb-2 shadow-sm cursor-move"
                    draggable
                    onDragStart={(evt) => startDrag(evt, item)}
                    onDragOver={(evt) => draggingOver(evt)}
                    onDrop={(evt) => onDrop(evt, "response")}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <button
            className="bg-primary-dark text-white rounded px-4 py-2"
            onClick={handleAdd}
          >
            Agregar
          </button>
          <button
            className="bg-primary-dark text-white rounded px-4 py-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}