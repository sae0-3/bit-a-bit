import { useEffect, useRef, useState } from 'react'

type AddOptionModal = {
  onClose: () => void
  addOption: (option: string) => void
}

export const AddOptionModal = ({ onClose, addOption }: AddOptionModal) => {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
      <form
        onSubmit={handleAdd}
        className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md flex flex-col gap-2"
      >
        <div className={`h-full w-full ${!!error ? '' : 'mb-4'} flex flex-col justify-center items-center gap-2`}>
          <label htmlFor="new-option" className="font-semibold">Agregar Opción</label>
          <input
            id="new-option"
            name="new-option"
            type="text"
            placeholder="Ingrese la opcion"
            className="mt-2 w-full h-10 border border-gray-300 rounded px-3"
            onChange={(e) => { setInput(e.target.value) }}
            ref={inputRef}
            autoComplete="off"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex justify-around items-center">
          <button
            className="bg-primary-dark text-white rounded px-4 py-2 cursor-pointer"
            type="submit"
          >
            Agregar
          </button>
          <button
            className="bg-primary-dark text-white rounded px-4 py-2 cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form >
    </div>
  )
}
