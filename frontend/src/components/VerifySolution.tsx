import { useEffect, useState } from 'react'
import { useSolutionValidation } from '../hooks/useSolutions'
import { useSolutionStore } from '../stores/solutions.store'
import { useValidateSolution } from '../hooks/useSolutions'

export interface VerifySolutionProps {
  solutionId: string
}

export const VerifySolution = ({ solutionId }: VerifySolutionProps) => {
  const { clearAnswer } = useSolutionStore()
  const [message, setMessage] = useState<string | null>(null)
  const { mutate: validateSolution, data, isSuccess } = useValidateSolution(
    {
      onSuccess: (data) => {
        setMessage(data.message)
        console.log('Respuesta validación:', data);
      }
    }
  )
  const {
    isValidAnswer,
    answerCount,
    canSubmit,
    validationMessage,
  } = useSolutionValidation()

  const handleVerifySolution = () => {
    if (!canSubmit) return
    validateSolution(solutionId)
  }

  useEffect(() => {
    if (data && isSuccess) {
      setMessage(data.message)
    }
  }, [data, isSuccess, answerCount])

  return (
    <>
      <div>
        {data && isSuccess && (
          <h3 className={`text-center ${data.valid ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </h3>
        )}
      </div>
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
            disabled={answerCount === 0}
            className="text-gray-600 bg-gray-200 py-2 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpiar
          </button>

          <button
            onClick={handleVerifySolution}
            disabled={!canSubmit}
            className="bg-primary-dark text-white py-2 px-4 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'Verificar Solución'}
          </button>
        </div>
      </div>
    </>
  )
}
