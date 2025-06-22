import { BsGrid3X3Gap } from 'react-icons/bs'
import { HiArrowRight, HiExclamationCircle, HiTrash } from 'react-icons/hi2'

import { useDeleteSolutionById, useGetSolutionsFromQuestion } from '../hooks/useSolutions'

interface ListSolutionsProps {
  questionId: string
}

export const ListSolutions = ({ questionId }: ListSolutionsProps) => {
  const { data: solutions, isLoading, isError } = useGetSolutionsFromQuestion(questionId)
  const { mutate: remove, isPending } = useDeleteSolutionById(questionId)

  if (isLoading) return (
    <div className="flex items-center gap-3 p-4 bg-secondary-1/10 rounded-xl">
      <div className="w-5 h-5 border-2 border-secondary-1 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium text-primary-dark">Cargando soluciones...</span>
    </div>
  )

  if (isError) return (
    <div className="flex items-center gap-3 p-4 bg-accent-red/10 rounded-xl border border-accent-red/20">
      <div className="w-5 h-5 bg-accent-red/20 rounded-full flex items-center justify-center">
        <HiExclamationCircle className="w-4 h-4 text-accent-red" />
      </div>
      <span className="text-sm font-medium text-accent-red">Error al cargar soluciones</span>
    </div>
  )

  if (!solutions || solutions.length === 0) return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-16 h-16 bg-secondary-gray/20 rounded-full flex items-center justify-center mb-4">
        <BsGrid3X3Gap className="w-8 h-8 text-secondary-gray" />
      </div>
      <p className="text-sm font-medium text-primary-dark/60 mb-2">No hay soluciones creadas</p>
      <p className="text-xs text-primary-dark/40">Las soluciones que crees aparecerán aquí</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {solutions.map((solution, index) => (
        <div
          key={solution.id}
          className="bg-gradient-to-r from-white to-secondary-1/5 border border-secondary-1/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary-dark/60">
                  Solución #{index + 1}
                </span>
                <HiArrowRight className="w-3 h-3 text-secondary-1" />
                <span className="text-xs font-medium text-secondary-1">
                  {solution.path.length} patrones
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {solution.final_sequence.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm border border-secondary-1/20 rounded-lg text-xs font-medium text-primary-dark shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() => remove(solution.id)}
                disabled={isPending}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-accent-red bg-accent-red/10 hover:bg-accent-red/20 border border-accent-red/20 hover:border-accent-red/30 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:cursor-pointer"
              >
                {isPending ? (
                  <>
                    <div className="w-3 h-3 border-2 border-accent-red/30 border-t-accent-red rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <HiTrash className="w-3 h-3" />
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
