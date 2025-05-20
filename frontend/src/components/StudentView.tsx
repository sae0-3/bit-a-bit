import { useState } from 'react'

import { Option } from '../types/form-question'
import { CreateAnswerStudent } from './CreateAnswerStudent'
import { DescriptionStudent } from './DescriptionStudent'
import { VerifyButton } from './VerifyButton'

export const StudentView = () => {
  const [answer, setAnswer] = useState<Option[]>([])

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      <div className="w-10/12">
        <DescriptionStudent />
      </div>

      <div className="w-10/12">
        <CreateAnswerStudent listAnswer={answer} setListAnswer={setAnswer} />
      </div>

      <section className="w-10/12 flex justify-end gap-4 flex-wrap">
        <VerifyButton answer={answer} />
      </section>
    </div>
  )
}
