import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'

import { useGetQuestionById } from '../../../hooks/useQuestions'
import { useUpdateQuestionById } from '../../../hooks/useQuestions'
import { DescriptionEditor } from '../../../components/DescriptionEditor'
import { useQuestionFormStore } from '../../../stores/question-form.store'
import { useEffect } from 'react'

export const Route = createFileRoute('/questions/edit/$questionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { questionId } = Route.useParams()
  const { data: question, isPending, isError } = useGetQuestionById(questionId)
  const { mutate: edit } = useUpdateQuestionById(questionId)
  const { resetForm, title, description, setDescription, setTitle } = useQuestionFormStore()
  const router = useRouter()
  const canGoBack = useCanGoBack()

  const handleCancel = () => {
    if (canGoBack) {
      router.history.back()
    } else {
      router.navigate({ to: '/', replace: true })
    }
    resetForm()
  }

  const handleEdit = () => {
    edit({ title: title, description: description })
    resetForm()
    router.navigate({ to: '/', replace: true })
  }

  useEffect(() => {
    if (question) {
      setTitle(question.title)
      setDescription(String(question.description))
    }
  }
    , [question])

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-4">
      <h1 className="font-bold text-2xl">Registra tu pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center items-center gap-5 max-w-xl">
        <div className="w-full flex flex-col gap-4">
          <DescriptionEditor />
        </div>

        {isError && (
          <p className='text-center text-red-500'>
            Ocurrió un problema al crear la pregunta
          </p>
        )}
        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center"
          onClick={() => router.navigate({ to: '/questions/create/$questionId', params: { questionId } })}
        >
          <span>Crear nueva respuesta</span>
        </button>

        <div className="w-full flex justify-between items-center gap-2 flex-wrap">
          <button
            className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center"
            onClick={handleCancel}
          >
            <span>Cancelar</span>
          </button>
          <button
            className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center disabled:opacity-50"
            onClick={() => handleEdit()}
            disabled={isPending}
          >
            <span>{isPending ? 'Editando...' : 'Editar pregunta'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
