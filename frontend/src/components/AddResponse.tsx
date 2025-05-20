import { useState } from 'react'
import { LuPlus } from 'react-icons/lu'

import { useQuestionFormStore } from '../stores/question-form.store'
import { Answer } from '../types/form-question'
import { AddResponseModal } from './AddResponseModal'
import { ModalResponse } from './ModalResponse'

export const AddResponse = () => {
  const [viewAddModal, setViewAddModal] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<Answer | null>(null)

  const { responses } = useQuestionFormStore()

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Respuestas:</h2>

        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center gap-1 justify-center"
          onClick={() => setViewAddModal(true)}
        >
          <span className="text-center">Crear</span> <LuPlus />
        </button>
      </div>

      {responses.length === 0 ? (
        <p className="text-center italic text-gray-500 my-2">No existen respuestas creadas</p>
      ) : (
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
      )}

      {viewAddModal && (
        <AddResponseModal onClose={() => setViewAddModal(false)} />
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
