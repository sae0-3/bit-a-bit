import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { FaPlus } from 'react-icons/fa'

import { CardQuestion } from '../../../components/CardQuestion'
import { useGetQuestions } from '../../../hooks/useQuestions'

export const Route = createFileRoute('/questions/dynamic/')({
  component: IndexQuestionComponent,
})

function IndexQuestionComponent() {
  const { data, isError, isLoading } = useGetQuestions()
  const navigate = useNavigate()

  if (isError) {
    return (
      <div className="mt-10">
        <p className="text-red-500 text-center italic font-semibold text-xl">Ocurrio un problema</p>
      </div>
    )
  }

  return (
    <section className="flex flex-col items-center py-6 gap-6 lg:gap-8">
      <div className="w-10/12 flex flex-col items-center flex-wrap gap-2 lg:flex-row lg:justify-between">
        <h1 className="text-2xl font-bold">Preguntas Creadas</h1>

        <button
          onClick={() => navigate({ from: "/questions/dynamic/create" })}
          className="bg-primary-dark w-full max-w-sm py-2 px-4 rounded-lg flex justify-center items-center gap-1 flex-wrap text-white disabled:opacity-50"
          disabled={isLoading}
        >
          <span className="text-center">Crear Pregunta</span>
          <FaPlus />
        </button>
      </div>

      {!!data && data.length === 0 ? (
        <span className="text-gray-500 text-center italic">No existen preguntas creadas</span>
      ) : (
        <div className="w-10/12 flex flex-col gap-4">
          {data?.map((question) => (
            <CardQuestion
              key={question.id}
              id={question.id}
              title={question.title}
              min_age={question.min_age}
              max_age={question.max_age}
              created_at={question.created_at}
              updated_at={question.updated_at}
            />
          ))}
        </div>
      )}
    </section>
  )
}
