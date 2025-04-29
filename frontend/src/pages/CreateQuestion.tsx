import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { DescriptionEditor } from '../components/DescriptionEditor'
import { Options } from '../components/Options'
import { Modal } from '../components/Modal'

export default function CreateQuestion() {
  const [optiones, setOptions] = useState<string[]>(['optionA', 'optionB', 'optionC', 'optionD', 'optionE'])
  const [viewModal, setviewModal] = useState(false)

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <DescriptionEditor />

      {viewModal && (
        <Modal title={"ingrese la opcion:"} setValues={setOptions} onClose={() => setviewModal(false)} />
      )}

      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        onClick={() => setviewModal(true)}
      >
        <span>Agregar opciones</span> <LuPlus />
      </button>

      <Options values={optiones} setValues={setOptions} />
    </div >
  )
}
