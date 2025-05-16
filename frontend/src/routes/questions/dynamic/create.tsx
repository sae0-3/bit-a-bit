import { createFileRoute, Link } from '@tanstack/react-router'
import { LuPlus, LuUserRoundPen } from 'react-icons/lu'

import { DescriptionEditor } from '../../../components/DescriptionEditor'
import { DropzoneImagesUpload } from '../../../components/DropzoneImagesUpload'
import { Options } from '../../../components/Options'
import { useQuestionFormStore } from '../../../stores/question-form.store'
import { useState } from 'react'
import { AddResponseModal } from '../../../components/AddResponseModal'

export const Route = createFileRoute('/questions/dynamic/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const [viewModal, setviewModal] = useState({
    responseModal: false,
  })
  const { options, responses, addResponse } = useQuestionFormStore()

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-5">
      <h1 className="font-bold text-2xl">Crear Pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <DescriptionEditor />
        </div>

        <div className="w-full lg:w-1/2">
          <DropzoneImagesUpload />
        </div>
      </div>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <Options />
        </div>

        <div>
          <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
            onClick={() => setviewModal({ ...viewModal, responseModal: true })}
          >
            <span>Crear Respuesta</span> <LuPlus />
          </button>

          {viewModal.responseModal && (
            <AddResponseModal
              addResponse={addResponse}
              onClose={() => setviewModal({ ...viewModal, responseModal: false })}
              availableOptions={options}
            />
          )}

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
        </div>
      </div>

      <Link
        to="/questions/dynamic/view"
        className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
      >
        <span>Vista de estudiante</span>
        <LuUserRoundPen />
      </Link>
    </section >
  )
}
