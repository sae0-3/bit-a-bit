import { createFileRoute, Link } from '@tanstack/react-router'
import { FaQuestion } from 'react-icons/fa'
import { TbAdjustmentsQuestion } from 'react-icons/tb'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <section className="flex flex-col py-5 gap-5">
      <h1 className="text-3xl font-bold text-center">Crea Preguntas</h1>

      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-8 md:flex-row flex-wrap">
        <Link to="/questions/dynamic"
          className="flex flex-col justify-center items-center px-5 py-8 border rounded-xl bg-primary-dark w-48"
        >
          <TbAdjustmentsQuestion size="50" color="#fff" />
          <span className="text-white text-center">Preguntas Dinámicas</span>
        </Link>

        <Link to="/"
          className="flex flex-col justify-center items-center px-5 py-8 border rounded-xl bg-primary-dark w-48 opacity-30"
          disabled
        >
          <FaQuestion size="50" color="#fff" />
          <span className="text-white text-center">Preguntas Estáticas</span>
        </Link>
      </div>
    </section>
  )
}
