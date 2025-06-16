import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useGetQuestionById } from '../../../hooks/useQuestions'
import { NumberCards } from '../../../components/NumberCards'
import { useSolutionStore } from '../../../stores/solutions.store'
import { CreateSolution } from '../../../components/CreateSolution'
import { useTransformSequence } from '../../../hooks/useSolutions'
import { VerifySolution } from '../../../components/VerifySolution'
import { useGetRandomSolution } from '../../../hooks/useSolutions'

export const Route = createFileRoute('/questions/preview/$questionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { questionId } = Route.useParams()
  const { data: question, isLoading, isError, isSuccess } = useGetQuestionById(questionId)
  const { answerCodes, setFinalSequence, setInitialSequence, finalSequence } = useSolutionStore()
  const { mutate: transformSequence } = useTransformSequence()
  const { data: randomSolution, isError: errorSolution, isLoading: loadingSolution } = useGetRandomSolution(questionId)
  const sequence = randomSolution ? randomSolution.final_sequence.map(element => String(element)) : []

  useEffect(() => {
    if (question && randomSolution)
      setInitialSequence(question.initial_sequence)
  }, [isSuccess, question, randomSolution])

  useEffect(() => {
    if (answerCodes.length > 0)
      transformSequence()
    else if (question)
      setFinalSequence(question.initial_sequence)
  }, [answerCodes])

  if (isLoading || loadingSolution) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-gray-600">Cargando pregunta...</div>
    </div>
  )

  if (isError || !question) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600">Error al cargar la pregunta</div>
    </div>
  )

  if (errorSolution || !randomSolution) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg text-red-600">Error al cargar la solución o no tiene soluciones agregadas</div>
    </div>
  )

  return (
    <section className="flex flex-col items-center gap-6 lg:gap-8 ">
      <div className="w-10/12 rounded-lg p-6 lg:p-8 space-y-6">

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
              <div className="bg-primary-light rounded-lg p-4 inline-block">
                <NumberCards number={sequence} />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="px-4">
            <CreateSolution />
          </div>

          <div className="px-4">
            <VerifySolution />
          </div>
        </div>

      </div>
    </section>
  )
}