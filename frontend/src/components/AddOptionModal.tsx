import { useState } from 'react'

type AddOptionModal = {
  onClose: () => void
  addOption: (option: string) => void
}

export const AddOptionModal = ({ onClose, addOption }: AddOptionModal) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  if (!onClose) return null

  const handleAdd = () => {
    if (input.trim() === '') {
      setError('El campo no puede estar vacio')
      return
    }

    setError(null)
    addOption(input)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md">
        <div className={`h-full w-full ${error ? '' : 'mb-4'} flex flex-col justify-center items-center`}>
          <p className="font-semibold">Agregar Opción</p>
          <input
            type="text"
            placeholder="Ingrese la opcion"
            className="mt-2 w-full h-10 border border-gray-300 rounded px-3"
            onChange={(e) => { setInput(e.target.value) }}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex justify-around">
          <button
            className="bg-primary-dark text-white rounded px-4 py-2"
            onClick={handleAdd}>
            Agregar
          </button>
          <button
            className="bg-primary-dark text-white rounded px-4 py-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div >
    </div>
  )
}
