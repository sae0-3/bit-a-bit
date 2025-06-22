import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FaTimes } from 'react-icons/fa'
import { IoIosInformationCircle } from 'react-icons/io'
import { MdSave } from 'react-icons/md'

import { FormQuestion } from '../../../components/FormQuestion'
import { useCreateQuestion } from '../../../hooks/useQuestions'
import { useQuestionFormStore } from '../../../stores/question-form.store'

export const Route = createFileRoute('/_authenticated/questions/create')({
  component: CreateQuestionComponent,
})

function CreateQuestionComponent() {
  const { mutate: create, isPending, isError } = useCreateQuestion()
  const { resetForm, title, initialNumber } = useQuestionFormStore()
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

  const isFormValid = title.trim() && initialNumber.length > 0

  return (
    <section className="min-h-screen">
      <div className="w-10/12 max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-primary-dark mb-1">Crear Nueva Pregunta</h1>
        <p className="text-primary-dark/70">Completa el formulario para registrar tu pregunta</p>
      </div>

      <div className="w-10/12 max-w-4xl mx-auto pb-6">
        <div className="space-y-4">
          <FormQuestion
            formId="create-question-form"
            onSubmit={handleSubmit}
          />

          <div className="bg-white rounded-2xl shadow-lg border border-secondary-gray/20 p-3 lg:p-6">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
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
                form="create-question-form"
                disabled={isPending || !isFormValid}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creando...</span>
                  </>
                ) : (
                  <>
                    <MdSave className="w-4 h-4 group-hover:scale-130 transition-transform duration-200" />
                    <span>Crear Pregunta</span>
                  </>
                )}
              </button>
            </div>

            {!isFormValid && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700 text-center">
                  Completa el título y la secuencia numérica para continuar
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
                <h3 className="text-lg font-semibold text-accent-red">Error al crear la pregunta</h3>
              </div>
              <p className="text-primary-dark/80 ml-11">
                Ocurrió un problema inesperado. Por favor, inténtalo de nuevo.
              </p>
            </div>
          )}

          <div className="bg-primary-light border border-secondary-2/20 rounded-2xl p-3 lg:p-6">
            <h3 className="text-lg font-semibold text-primary-dark mb-3 flex gap-1 items-center">
              <IoIosInformationCircle className="w-6 h-6" />
              <p className="flex-1">Información importante</p>
            </h3>
            <ul className="space-y-2 text-primary-dark/80 list-disc pl-6">
              <li>La secuencia numérica no puede modificarse después de la creación</li>
              <li>Puedes actualizar el título y la descripción en cualquier momento</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
