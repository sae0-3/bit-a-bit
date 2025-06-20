import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { CreateSolution } from '../../components/CreateSolution'
import { NumberCards } from '../../components/NumberCards'
import { VerifySolution } from '../../components/VerifySolution'
import { useGetQuestionById } from '../../hooks/useQuestions'
import { useGetNumberSolutionsByQuestion, useTransformSequence } from '../../hooks/useSolutions'
import { useSolutionStore } from '../../stores/solutions.store'

export const Route = createFileRoute('/questions/preview/$questionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { questionId } = Route.useParams()
  const { data: question, isLoading, isError, isSuccess } = useGetQuestionById(questionId)
  const { answerCodes, setFinalSequence, setInitialSequence, finalSequence } = useSolutionStore()
  const { data: solutions, isSuccess: solutionSucces, isError: errorSolutions, isLoading: loadingSolutions } = useGetNumberSolutionsByQuestion(questionId)
  const { mutate: transformSequence } = useTransformSequence()

  useEffect(() => {
    if (question && solutions)
      setInitialSequence(question.initial_sequence)
  }, [isSuccess, question, solutions])

  useEffect(() => {
    if (answerCodes.length > 0)
      transformSequence()
    else if (question)
      setFinalSequence(question.initial_sequence)
  }, [answerCodes])

  if (isLoading || loadingSolutions) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-gray-600">Cargando pregunta...</div>
    </div>
  )

  if (isError || !question) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600">Error al cargar la pregunta</div>
    </div>
  )

  if (errorSolutions || !solutions) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600">Error al cargar la solución o no tiene soluciones agregadas</div>
    </div>
  )

  return (
    <section className="flex flex-col items-center gap-6 lg:gap-8">
      <div className="w-10/12 max-w-4xl py-6 space-y-6">
        <div className="text-center space-y-3">
          <h1 className={`font-bold text-2xl ${!question.title ? 'opacity-50 text-gray-400' : 'text-gray-900'}`}>
            {question.title || 'Sin título'}
          </h1>
          <p className={`text-left ${!question.description ? 'opacity-50 text-gray-400' : 'text-gray-700'}`}>
            {question.description || 'Sin descripción...'}
          </p>
        </div>

        <div className="pt-1">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="font-semibold text-lg text-gray-800 mb-3">Secuencia Actual</h2>
              <div className="bg-primary-light rounded-lg p-4 inline-block">
                <NumberCards number={finalSequence} />
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-semibold text-lg text-gray-800 mb-3">Secuencia Objetivo</h2>
              <div className='flex justify-center items-center flex-col'>
                {solutions && solutionSucces && (
                  solutions.map((solutionNumber, idx) => (
                    <div key={`solution-${idx}`} className="bg-primary-light rounded-lg p-4 inline-block">
                      <NumberCards number={solutionNumber} targetSequence={finalSequence} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="px-4">
            <CreateSolution />
          </div>

          <div className="px-4">
            <VerifySolution questionId={questionId} />
          </div>
        </div>
      </div>
    </section>
  )
}
