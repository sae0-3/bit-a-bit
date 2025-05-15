import { createFileRoute, Link } from '@tanstack/react-router'
import { FaPlus } from 'react-icons/fa'

export const Route = createFileRoute('/questions/dynamic/')({
  component: IndexQuestionComponent,
})

function IndexQuestionComponent() {
  return (
    <div className="flex flex-col items-center py-6 gap-8">
      <Link
        to="/questions/dynamic/create"
        className="bg-primary-dark w-10/12 max-w-lg p-3 rounded-xl flex justify-center items-center gap-1 flex-wrap"
      >
        <span className="text-center text-white">Crear Pregunta</span>
        <FaPlus color="#fff" />
      </Link>

      <div className="w-10/12 flex flex-col items-center">
        <span className="text-gray-500 text-center">No existen preguntas creadas</span>
      </div>
    </div>
  )
}
