import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'

import { CreateSolution } from '../../../components/CreateSolution'
import { ListSolutions } from '../../../components/ListSolutions'
import { NumberCards } from '../../../components/NumberCards'
import { SubmitSolution } from '../../../components/SubmitSolution'
import { useGetQuestionById } from '../../../hooks/useQuestions'
import { useTransformSequence } from '../../../hooks/useSolutions'
import { useSolutionStore } from '../../../stores/solutions.store'

export const Route = createFileRoute('/questions/create/$questionId')({
  component: CreateQuestionAddAnswersComponent,
})

function CreateQuestionAddAnswersComponent() {
  const { questionId } = Route.useParams()
  const { data: question, isLoading, isError, isSuccess } = useGetQuestionById(questionId)
  const { finalSequence, setInitialSequence, setFinalSequence, answerCodes } = useSolutionStore()
  const { mutate: transform } = useTransformSequence()

  useEffect(() => {
    if (question)
      setInitialSequence(question.initial_sequence)
  }, [isSuccess, question])

  useEffect(() => {
    if (answerCodes.length > 0)
      transform()
    else if (question)
      setFinalSequence(question.initial_sequence)
  }, [answerCodes])

  if (isLoading) return (
    <p>Cargando información de la pregunta...</p>
  )

  if (isError || !question) return (
    <p>Error al cargar la información de la pregunta</p>
  )

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-4">
      <h1 className="font-bold text-2xl text-center">Agregar Respuestas</h1>
      <NumberCards number={finalSequence} />

      <div className="w-10/12 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-3">
          <CreateSolution />
          <SubmitSolution questionId={questionId} initial_sequence={question.initial_sequence} />
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Soluciones Creadas:</h2>
          <ListSolutions questionId={questionId} />
        </div>

        <Link
          to="/questions/dynamic"
          className="ml-auto bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Terminar
        </Link>
      </div>
    </section>
  )
}
