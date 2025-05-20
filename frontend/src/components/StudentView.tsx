import { LuShieldCheck } from 'react-icons/lu'

import { CreateAnswerStudent } from './CreateAnswerStudent'
import { DescriptionStudent } from './DescriptionStudent'

export const StudentView = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      <div className="w-10/12">
        <DescriptionStudent />
      </div>

      <div className="w-10/12">
        <CreateAnswerStudent />
      </div>

      <section className="w-10/12 flex justify-end gap-4 flex-wrap">
        <button className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1">
          <span>Verificar</span> <LuShieldCheck />
        </button>
      </section>
    </div>
  );
}
