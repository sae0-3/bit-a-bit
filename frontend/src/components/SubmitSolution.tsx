import { useCreateSolution, useSolutionValidation } from '../hooks/useSolutions'
import { useSolutionStore } from '../stores/solutions.store'

interface SubmitSolutionProps {
  questionId: string
  initial_sequence: Array<string>
}

export const SubmitSolution = (props: SubmitSolutionProps) => {
  const { clearAnswer } = useSolutionStore()
  const {
    isValidAnswer,
    answerCount,
    canSubmit,
    validationMessage
  } = useSolutionValidation()
  const { mutate: create, isPending } = useCreateSolution()

  const handleCreateSolution = () => {
    if (!canSubmit) return
    create(props.questionId)
  }

  return (
    <div className="flex flex-col gap-2 items-center lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-2">
        {validationMessage && (
          <p className="text-amber-600 text-sm text-center lg:text-left">
            {validationMessage}
          </p>
        )}

        <p className="text-xs text-gray-500 text-center lg:text-left">
          Estado: {isValidAnswer ? '✅ Válido' : '❌ Inválido'} |
          Patrones: {answerCount} | {canSubmit ? 'Listo para enviar' : 'No se puede enviar'}
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={() => clearAnswer()}
          disabled={answerCount === 0 || isPending}
          className="text-gray-600 bg-gray-200 py-2 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpiar
        </button>

        <button
          onClick={handleCreateSolution}
          disabled={!canSubmit || isPending}
          className="bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creando...' : 'Crear Solución'}
        </button>
      </div>
    </div>
  )
}
