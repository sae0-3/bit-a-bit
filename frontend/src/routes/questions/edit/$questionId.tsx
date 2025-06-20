import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'

import { FormQuestion } from '../../../components/FormQuestion'
import { useGetQuestionById, useUpdateQuestionById } from '../../../hooks/useQuestions'
import { useQuestionFormStore } from '../../../stores/question-form.store'

export const Route = createFileRoute('/questions/edit/$questionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { questionId } = Route.useParams()
  const { data: question, isLoading } = useGetQuestionById(questionId)
  const { mutate: edit, isPending, isError } = useUpdateQuestionById(questionId)
  const { resetForm, title, description } = useQuestionFormStore()
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

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    edit({ title, description })
  }

  if (isLoading) return null

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-4">
      <h1 className="font-bold text-2xl">Registra tu pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center items-center gap-5 max-w-xl">
        <FormQuestion
          formId="update-question-form"
          onSubmit={handleEdit}
          initialValues={{
            title: question?.title,
            description: question?.description ?? '',
            sequence: question?.initial_sequence,
          }}
          editable={false}
        />

        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center"
          onClick={() => {
            router.navigate({ to: '/questions/create/$questionId', params: { questionId } }),
              resetForm()
          }}
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
            type="submit"
            form="update-question-form"
            disabled={isPending}
          >
            <span>{isPending ? 'Editando...' : 'Editar pregunta'}</span>
          </button>
        </div>

        {isError && (
          <p className="text-center text-red-500">
            Ocurrió un problema al editar la pregunta
          </p>
        )}
      </div>
    </section >
  )
}
