import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { DescriptionEditor } from '../components/DescriptionEditor'
import { Options } from '../components/Options'

export default function CreateQuestion() {
  const [optiones, setOptions] = useState<string[]>(['optionA', 'optionB', 'optionC', 'optionD', 'optionE'])

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <DescriptionEditor />

      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1">
        <span>Agregar opciones</span> <LuPlus />
      </button>

      <Options values={optiones} setValues={setOptions} />
    </div>
  )
}
