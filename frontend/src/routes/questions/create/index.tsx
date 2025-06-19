import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'

import { AddNumberGame } from '../../../components/AddNumberGame'
import { DescriptionEditor } from '../../../components/DescriptionEditor'
// import { DropzoneImagesUpload } from '../../../components/DropzoneImagesUpload'
import { useCreateQuestion } from '../../../hooks/useQuestions'
import { useQuestionFormStore } from '../../../stores/question-form.store'

export const Route = createFileRoute('/questions/create/')({
  component: CreateQuestionComponent,
})

function CreateQuestionComponent() {
  const { mutate: create, isPending, isError } = useCreateQuestion()
  const { resetForm } = useQuestionFormStore()
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    create()
  }

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-4">
      <h1 className="font-bold text-2xl">Registra tu pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center items-center gap-5 max-w-xl">
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
          id="question-create-form"
        >
          <DescriptionEditor />
          {/* <DropzoneImagesUpload /> */}
          <AddNumberGame />
        </form>

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
            form="question-create-form"
            disabled={isPending}
          >
            <span>{isPending ? 'Registrando...' : 'Registrar pregunta'}</span>
          </button>
        </div>

        {isError && (
          <p className="text-center text-red-500">
            Ocurrió un problema al crear la pregunta
          </p>
        )}
      </div>
    </section>
  )
}
