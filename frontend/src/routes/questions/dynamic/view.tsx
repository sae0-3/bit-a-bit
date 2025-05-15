import { createFileRoute, Link } from '@tanstack/react-router'
import { LuShieldCheck, LuUserRoundCog } from 'react-icons/lu'

import { CreateAnswerStudent } from '../../../components/CreateAnswerStudent'
import { DescriptionStudent } from '../../../components/DescriptionStudent'

export const Route = createFileRoute('/questions/dynamic/view')({
  component: ViewQuestionComponent,
})

function ViewQuestionComponent() {
  return (
    <div className="w-full flex flex-col items-center gap-4 my-4">
      <div className="w-10/12">
        <DescriptionStudent />
      </div>

      <CreateAnswerStudent />

      <section className="w-10/12 flex justify-between gap-4 flex-wrap">
        <Link
          className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
          to="/questions/dynamic/create"
        >
          <span>Vista de profesor</span> <LuUserRoundCog />
        </Link>

        <button
          className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
        >
          <span>Verificar</span> <LuShieldCheck />
        </button>
      </section>
    </div>
  )
}
