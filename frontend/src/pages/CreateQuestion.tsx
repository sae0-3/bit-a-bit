import { useState } from 'react'
import { LuPlus, LuUserRoundPen } from 'react-icons/lu'

import { AddOptionModal } from '../components/AddOptionModal'
import { DescriptionEditor } from '../components/DescriptionEditor'
import { Options } from '../components/Options'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Link } from '@tanstack/react-router'

export default function CreateQuestion() {
  const [viewModal, setviewModal] = useState(false)
  const { addOption } = useQuestionFormStore()

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <DescriptionEditor />

      {viewModal && (
        <AddOptionModal
          addOption={addOption}
          onClose={() => setviewModal(false)}
        />
      )}

      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        onClick={() => setviewModal(true)}
      >
        <span>Agregar opciones</span> <LuPlus />
      </button>

      <Options />

      <Link
        className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        to="/view-student"
      >
        <span>Vista de estudiante</span> <LuUserRoundPen />
      </Link>
    </div >
  )
}
