import { createFileRoute, Link } from '@tanstack/react-router'
import { FaExclamationTriangle, FaPlus, FaRegFileAlt } from 'react-icons/fa'
import { MdEditCalendar } from 'react-icons/md'

import { CardQuestion } from '../../components/CardQuestion'
import { useGetQuestions } from '../../hooks/useQuestions'

export const Route = createFileRoute('/_authenticated/')({
  component: IndexQuestionComponent,
})

function IndexQuestionComponent() {
  const { data: questions, isError, isLoading } = useGetQuestions()

  if (isError) {
    return (
      <div className="w-10/12 bg-accent-red/10 border border-accent-red/30 rounded-2xl p-6 my-10 text-center max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-accent-red w-6 h-6" />
          </div>
        </div>
        <h2 className="text-lg font-bold text-accent-red mb-1">Error al cargar</h2>
        <p className="text-primary-dark/80 mb-4">No se pudieron obtener las preguntas.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-dark text-primary-light rounded-lg hover:bg-primary-dark/90 transition-colors hover:cursor-pointer"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <section className="text-primary-dark">
      <div className="w-10/12 max-w-4xl mx-auto py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-dark rounded-xl flex items-center justify-center shadow-md">
            <MdEditCalendar className="w-6 h-6 text-primary-light" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Preguntas Creadas</h1>
            <p className="text-sm text-primary-dark/70">
              {isLoading
                ? 'Cargando preguntas...'
                : `${questions?.length || 0} pregunta${questions?.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        <Link
          to="/questions/create"
          className={`bg-primary-dark hover:bg-primary-dark/90 text-primary-light px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <FaPlus className="w-4 h-4" />
          <span>Crear Pregunta</span>
        </Link>
      </div>

      <div className="w-10/12 max-w-4xl mx-auto pb-8">
        {!questions || questions.length === 0 ? (
          <div className="text-center pt-8">
            <div className="bg-white border border-secondary-gray rounded-2xl p-10 max-w-md mx-auto shadow-md">
              <div className="w-16 h-16 bg-secondary-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRegFileAlt className="w-8 h-8 text-secondary-1" />
              </div>
              <h3 className="text-xl font-bold mb-2">¡No hay preguntas!</h3>
              <p className="text-primary-dark/70 mb-6">Empieza creando tu primera pregunta.</p>

              <Link
                to="/questions/create"
                className="inline-flex items-center gap-2 bg-primary-dark text-primary-light px-5 py-3 rounded-xl font-medium hover:bg-primary-dark/90 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus className="w-4 h-4" />
                <span>Crear Pregunta</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <CardQuestion
                  id={question.id}
                  title={question.title}
                  min_age={question.min_age}
                  max_age={question.max_age}
                  created_at={question.created_at}
                  updated_at={question.updated_at}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
