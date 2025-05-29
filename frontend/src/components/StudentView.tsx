import { useState } from 'react'

import { predefinedOption } from '../types/form-question'
import { CreateAnswerStudent } from './CreateAnswerStudent'
import { DescriptionStudent } from './DescriptionStudent'
import { VerifyButton } from './VerifyButton'
import { NumberCards } from './NumberCards'
import { useQuestionFormStore } from '../stores/question-form.store'
import { LuRefreshCcw } from 'react-icons/lu'

export const StudentView = () => {
  const [answer, setAnswer] = useState<predefinedOption[]>([])
  const { initialNumber, resultNumber } = useQuestionFormStore()

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      <div className="w-10/12">
        <NumberCards number={initialNumber} />
      </div>

      <div className="w-10/12">
        <NumberCards number={resultNumber} />
      </div>

      <div className="w-10/12">
        <DescriptionStudent />
      </div>

      <div className="w-10/12">
        <CreateAnswerStudent listAnswer={answer} setListAnswer={setAnswer} />
      </div>

      <section className="w-10/12 flex justify-end gap-4 flex-wrap">
        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center gap-1"
          onClick={() => { setAnswer([]) }}
        >
          <span>Reiniciar Respuestas</span> <LuRefreshCcw />
        </button>
        <VerifyButton listAnswer={answer} objetive={resultNumber} initial={initialNumber} />
      </section>
    </div>
  )
}
