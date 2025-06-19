import { useState } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'
import { NumberCards } from './NumberCards'

export const AddNumberGame = () => {
  const { initialNumber, setInitialNumber } = useQuestionFormStore()
  const [number, setNumber] = useState(initialNumber.join(''))
  const [error, setError] = useState('')

  const handleNumberInput = (value: string) => {
    setNumber(value)

    if (!/^\d*$/.test(value)) {
      setError('Por favor, ingrese un número válido.')
      return
    }

    if (value === '') {
      setError('El número debe ser mayor o igual a 0.')
      setInitialNumber([])
      return
    }

    setError('')
    setInitialNumber(
      value
        .split('')
        .map((char: string) => char.trim())
        .filter((char: string) => char !== '')
    )
  }

  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="numberGame"
          className="font-semibold text-lg"
        >
          Ingrese el numero para el juego: <span className="font-extrabold text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Ingrese el número"
          name="numberGame"
          id="numberGame"
          className="w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1"
          value={number}
          onChange={(e) => handleNumberInput(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <NumberCards number={initialNumber} />
    </>
  )
}
