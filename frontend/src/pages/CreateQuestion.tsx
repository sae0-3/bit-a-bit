import { useState } from 'react'
import { LuPlus, LuUserRoundPen } from 'react-icons/lu'

import { AddOptionModal } from '../components/AddOptionModal'
import { AddResponseModal } from '../components/AddResponseModal'
import { DescriptionEditor } from '../components/DescriptionEditor'
import { Options } from '../components/Options'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Link } from '@tanstack/react-router'

export default function CreateQuestion() {
  const [viewModal, setviewModal] = useState({
    optionModal: false,
    responseModal: false,
  });
  const { addOption, addResponse, options, responses } = useQuestionFormStore()

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <DescriptionEditor />

      {viewModal.optionModal && (
        <AddOptionModal
          addOption={addOption}
          onClose={() => setviewModal({ ...viewModal, optionModal: false })}
        />
      )}

      {viewModal.responseModal && (
        <AddResponseModal
          addResponse={addResponse}
          onClose={() => setviewModal({ ...viewModal, responseModal: false })}
          availableOptions={options}
        />
      )}

      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        onClick={() => setviewModal({ ...viewModal, optionModal: true })}
      >
        <span>Agregar opciones</span> <LuPlus />
      </button>

      <Options />

      <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        onClick={() => setviewModal({ ...viewModal, responseModal: true })}
      >
        <span>Crear Respuesta</span> <LuPlus />
      </button>

      {responses.length > 0 && (
        <div className="w-full flex flex-col items-center">
          <h3 className="font-medium text-gray-700 mb-4">Respuestas:</h3>

          <div className="flex flex-wrap justify-center gap-4 w-full px-4">
            {responses.map((value, index) => (
              <div
                key={`${value}-${index}`}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex-1 min-w-[200px] max-w-[300px]"
              >
                {value.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        to="/view-student"
      >
        <span>Vista de estudiante</span> <LuUserRoundPen />
      </Link>

    </div >
  )
}
