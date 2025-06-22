import { useEffect, useState } from 'react'
import { HiCheckCircle, HiMagnifyingGlass, HiSparkles, HiXCircle } from 'react-icons/hi2'

import { useSolutionValidation, useValidateAllSolutions } from '../hooks/useSolutions'

export interface VerifySolutionProps {
  questionId: string
}

export const VerifySolution = ({ questionId }: VerifySolutionProps) => {
  const [message, setMessage] = useState<string | null>(null)
  const { mutate: validateSolutions, data, isSuccess, isPending } = useValidateAllSolutions({
    onSuccess: (data) => {
      setMessage(data.message)
      console.log('Respuesta validación:', data)
    }
  })
  const { canSubmit } = useSolutionValidation()

  const handleVerifySolution = () => {
    if (!canSubmit) return
    validateSolutions(questionId)
  }

  useEffect(() => {
    if (data && isSuccess) {
      setMessage(data.message)
    }
  }, [data, isSuccess])

  return (
    <div className="space-y-2">
      {data && isSuccess && message && (
        <div className={`
          flex items-center gap-3 p-4 rounded-xl border transition-all duration-200
          ${data.valid
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
          }
        `}>
          {data.valid ? (
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <HiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <HiXCircle className="w-5 h-5 text-red-600" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">
              {data.valid ? 'Solución Correcta' : 'Solución Incorrecta'}
            </h3>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleVerifySolution}
          disabled={!canSubmit || isPending}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 hover:cursor-pointer bg-secondary-1 hover:bg-secondary-1/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verificando...
            </>
          ) : (
            <>
              <HiMagnifyingGlass className="w-4 h-4" />
              Verificar Solución
            </>
          )}
        </button>
      </div>

      {!canSubmit && (
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full">
            <HiSparkles className="w-4 h-4" />
            <span className="text-sm">Completa tu secuencia para verificar</span>
          </div>
        </div>
      )}
    </div>
  )
}
