import { HiCheckCircle, HiExclamationTriangle, HiSparkles } from 'react-icons/hi2'

import { useCreateSolution, useSolutionValidation } from '../hooks/useSolutions'

interface SubmitSolutionProps {
  questionId: string
  initial_sequence: Array<string>
}

export const SubmitSolution = (props: SubmitSolutionProps) => {
  const {
    isValidAnswer,
    canSubmit,
    validationMessage
  } = useSolutionValidation()
  const { mutate: create, isPending } = useCreateSolution()

  const handleCreateSolution = () => {
    if (!canSubmit) return
    create(props.questionId)
  }

  return (
    <div className="space-y-3">
      {validationMessage && (
        <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <HiExclamationTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700 font-medium">{validationMessage}</p>
        </div>
      )}

      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex items-center justify-center">
          <div className={`
          flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
          ${isValidAnswer
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
            }
          `}>
            {isValidAnswer ? (
              <HiCheckCircle className="w-4 h-4" />
            ) : (
              <HiSparkles className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isValidAnswer ? 'Secuencia válida' : 'Configura tu secuencia'}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleCreateSolution}
            disabled={!canSubmit || isPending}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 hover:cursor-pointer bg-primary-dark hover:bg-primary-dark/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creando solución...
              </>
            ) : (
              <>
                <HiSparkles className="w-4 h-4" />
                Crear Solución
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
