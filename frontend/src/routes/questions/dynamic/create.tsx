import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { LuPlus, LuUserRoundPen } from 'react-icons/lu'

import { AddOptionModal } from '../../../components/AddOptionModal'
import { DescriptionEditor } from '../../../components/DescriptionEditor'
import { Options } from '../../../components/Options'
import { useQuestionFormStore } from '../../../stores/question-form.store'

export const Route = createFileRoute('/questions/dynamic/create')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <span>Agregar opciones</span>
        <LuPlus />
      </button>

      <Options />

      <Link
        to="/questions/dynamic/view"
        className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
      >
        <span>Vista de estudiante</span>
        <LuUserRoundPen />
      </Link>
    </div >
  )
}
