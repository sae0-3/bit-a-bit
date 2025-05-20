import { createFileRoute, Link } from '@tanstack/react-router'
import { CiEdit } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa'
import { IoIosRemove } from 'react-icons/io'

import { Question } from '../../../types/question'

export const Route = createFileRoute('/questions/dynamic/')({
  component: IndexQuestionComponent,
})

function IndexQuestionComponent() {
  return (
    <section className="flex flex-col items-center py-6 gap-6 lg:gap-8">
      <div className="w-10/12 flex flex-col items-center flex-wrap gap-2 lg:flex-row lg:justify-between">
        <h1 className="text-2xl font-bold">Preguntas Creadas</h1>

        <Link
          to="/questions/dynamic/create"
          className="bg-primary-dark w-full max-w-sm py-2 px-4 rounded-lg flex justify-center items-center gap-1 flex-wrap text-white"
        >
          <span className="text-center">Crear Pregunta</span>
          <FaPlus />
        </Link>
      </div>

      {questions.length === 0 ? (
        <span className="text-gray-500 text-center italic">No existen preguntas creadas</span>
      ) : (
        <div className="w-10/12 flex flex-col gap-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex justify-between items-center gap-2 bg-primary-light p-1 rounde-lg shadow-md lg:p-4"
            >
              <div className="flex flex-wrap flex-col gap-2">
                <p className="font-medium text-lg lg:text-xl">{question.title}</p>

                <p className="flex flex-wrap gap-2 font-medium text-sm lg:text-base">
                  <span>
                    {question.options.length} {question.options.length === 1 ? 'Opición' : 'Opciones'}
                  </span>
                  <span>
                    {question.answers.length} {question.answers.length === 1 ? 'Respuesta' : 'Respuestas'}
                  </span>
                </p>

                <div className="flex flex-col text-xs gap-1">
                  <p className="flex flex-col lg:flex-row lg:text-sm lg:gap-1">
                    <span className="font-medium">Fecha de creación:</span>
                    <span>
                      {new Date(question.created_at).toLocaleDateString('es-ES', { dateStyle: 'full' })}
                    </span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:text-sm lg:gap-1">
                    <span className="font-medium">Ultima actualización:</span>
                    <span>
                      {new Date(question.updated_at).toLocaleDateString('es-ES', { dateStyle: 'full' })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-2 lg:flex-row">
                <button
                  className="bg-primary-dark rounded-lg flex items-center justify-center p-2 hover:cursor-pointer"
                >
                  <CiEdit className="text-white" size={30} />
                </button>
                <button
                  className="bg-red-500 rounded-lg flex items-center justify-center p-2 hover:cursor-pointer"
                >
                  <IoIosRemove className="text-white" size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

const questions: Question[] = [
  {
    id: 'id-question-one',
    title: 'Titulo de la primer pregunta',
    description: null,
    images: null,
    options: [
      { id: 'xunox', value: 'uno' },
      { id: 'xdosx', value: 'dos' },
    ],
    answers: [
      {
        id: 'question-one-answer-one',
        name: 'Respuesta 1',
        options: [
          { id: 'xunox', value: 'uno' },
          { id: 'xdosx', value: 'dos' },
        ]
      },
      {
        id: 'question-one-answer-two',
        name: 'Respuesta 2',
        options: [
          { id: 'xdosx', value: 'dos' },
          { id: 'xunox', value: 'uno' },
        ]
      },
    ],
    updated_at: '2025-05-20T06:37:22.457Z',
    created_at: '2025-05-17T03:17:42.418Z',
  },
  {
    id: 'id-question-two',
    title: 'Segunda pregunta',
    description: null,
    images: null,
    options: [
      { id: 'xax', value: 'a' },
    ],
    answers: [
      {
        id: 'question-one-answer-one',
        name: 'Respuesta 1',
        options: [{ id: 'xax', value: 'a' }]
      },
    ],
    updated_at: '2025-05-20T06:37:22.457Z',
    created_at: '2025-05-20T06:37:22.457Z',
  },
]
