import { useState } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'
import { NumberCards } from './NumberCards'

export const AddNumberGame = () => {
  const { initialNumber, setInitialNumber } = useQuestionFormStore()
  const [number, setNumber] = useState(initialNumber.join(''))

  const handleNumberInput = (value: string) => {
    if (!/^\d*$/.test(value)) {
      return
    }

    setNumber(value)
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
          Ingrese la secuencia inicial: <span className="font-extrabold text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Secuencia inicial (123...)"
          name="numberGame"
          id="numberGame"
          className="w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1"
          value={number}
          onChange={(e) => handleNumberInput(e.target.value)}
          required
          inputMode="numeric"
        />
      </div>

      <NumberCards number={initialNumber} />
    </>
  )
}
