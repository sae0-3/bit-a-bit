import { LuPlus } from 'react-icons/lu'
import { useState } from 'react'

import { AddResponseModal } from './AddResponseModal'
import { ModalResponse } from './ModalResponse'
import { useQuestionFormStore } from '../stores/question-form.store'
import { Response } from '../types/form-question'

export const AddResponse = () => {
  const [viewAddModal, setViewAddModal] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null)

  const { responses } = useQuestionFormStore()

  return (
    <div className="w-full flex flex-col gap-4">
      <button
        className="w-full bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1 justify-center"
        onClick={() => setViewAddModal(true)}
      >
        <span>Crear Respuesta</span> <LuPlus />
      </button>
      {viewAddModal && (
        <AddResponseModal onClose={() => setViewAddModal(false)} />
      )}
      {responses.length > 0 && (
        <div className="w-full flex flex-col items-center">
          <h3 className="font-medium text-gray-700 mb-4">Respuestas:</h3>
          <div className="flex flex-wrap justify-center gap-4 w-full px-4">
            {responses.map((resp) => (
              <button
                key={resp.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex-1 min-w-[200px] max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => setSelectedResponse(resp)}
              >
                {resp.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedResponse && (
        <ModalResponse
          response={selectedResponse}
          onClose={() => setSelectedResponse(null)}
        />
      )}
    </div>
  )
}
