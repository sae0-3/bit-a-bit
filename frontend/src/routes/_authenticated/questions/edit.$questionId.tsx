import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

import { FormQuestion } from '../../../components/FormQuestion'
import { useGetQuestionById, useUpdateQuestionById } from '../../../hooks/useQuestions'
import { useQuestionFormStore } from '../../../stores/question-form.store'

export const Route = createFileRoute('/_authenticated/questions/edit/$questionId')({
  component: EditQuestionComponent,
})

function EditQuestionComponent() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    edit({ title, description })
  }

  const isFormValid = title.trim().length > 0

  if (isLoading) return null

  return (
    <section className="min-h-screen">
      <div className="w-10/12 max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-primary-dark mb-1">Editar Pregunta</h1>
        <p className="text-primary-dark/70">Modifica el contenido que necesites y guarda los cambios</p>
      </div>

      <div className="w-10/12 max-w-4xl mx-auto pb-8">
        <div className="space-y-4">
          <FormQuestion
            formId="update-question-form"
            onSubmit={handleSubmit}
            initialValues={{
              title: question?.title,
              description: question?.description ?? '',
              sequence: question?.initial_sequence,
            }}
            editable={false}
          />

          <div className="bg-white rounded-2xl shadow-lg border border-secondary-gray/20 p-3 lg:p-6">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
              <button
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 bg-primary-dark/80 hover:bg-primary-dark text-white disabled:bg-secondary-gray/50 disabled:text-primary-dark/50 disabled:cursor-not-allowed hover:cursor-pointer"
                onClick={() => {
                  router.navigate({
                    to: '/questions/add-solutions/$questionId',
                    params: { questionId },
                  })
                  resetForm()
                }}
              >
                <FaPlus className="w-4 h-4 group-hover:scale-130 transition-transform duration-200" />
                <span>Agregar Respuestas</span>
              </button>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-secondary-gray/80 hover:bg-secondary-gray text-primary-dark font-medium rounded-xl transition-all duration-200 hover:cursor-pointer"
                  onClick={handleCancel}
                >
                  <FaTimes className="w-4 h-4 group-hover:scale-130 transition-transform duration-200" />
                  <span>Cancelar</span>
                </button>

                <button
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-medium rounded-xl transition-all duration-200 bg-primary-dark/80 hover:bg-primary-dark text-white disabled:bg-secondary-gray/50 disabled:text-primary-dark/50 disabled:cursor-not-allowed hover:cursor-pointer"
                  type="submit"
                  form="update-question-form"
                  disabled={isPending || !isFormValid}
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Editando...</span>
                    </>
                  ) : (
                    <>
                      <MdEdit className="w-4 h-4 group-hover:scale-130 transition-transform duration-200" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            {!isFormValid && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700 text-center">
                  El título no puede estar vacío
                </p>
              </div>
            )}
          </div>

          {isError && (
            <div className="bg-accent-red/10 border border-accent-red/30 rounded-2xl p-3 lg:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-accent-red/20 rounded-full flex items-center justify-center">
                  <FaTimes className="w-4 h-4 text-accent-red" />
                </div>
                <h3 className="text-lg font-semibold text-accent-red">Error al editar la pregunta</h3>
              </div>
              <p className="text-primary-dark/80 ml-11">
                Ocurrió un problema inesperado. Por favor, inténtalo de nuevo.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
