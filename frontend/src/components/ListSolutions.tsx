import { useDeleteSolutionById, useGetSolutionsFromQuestion } from '../hooks/useSolutions'

interface ListSolutionsProps {
  questionId: string
}

export const ListSolutions = ({ questionId }: ListSolutionsProps) => {
  const { data: solutions, isLoading, isError } = useGetSolutionsFromQuestion(questionId)
  const { mutate: remove, isPending } = useDeleteSolutionById(questionId)

  if (isLoading) return <p>Cargando soluciones...</p>

  if (isError) return <p>Error al cargar soluciones</p>

  if (!solutions || solutions.length === 0) return (
    <p className="text-center italic text-gray-500">No hay soluciones disponibles</p>
  )

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      {solutions.map(solution => (
        <div
          key={solution.id}
          className="w-full border p-2 rounded-lg shadow-sm shadow-gray-300 flex flex-col items-center gap-3 lg:p-4 lg:flex-row lg:justify-between"
        >
          <div className="flex flex-col gap-2 lg:flex-row">
            <p className="font-medium text-center">Secuencia final:</p>

            <div className="flex flex-wrap gap-2 flex-1">
              {solution.final_sequence.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 border rounded text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="border border-primary-dark text-primary-dark px-2 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-primary-dark enabled:hover:text-white enabled:hover:cursor-pointer"
              onClick={() => remove(solution.id)}
              disabled={isPending}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
