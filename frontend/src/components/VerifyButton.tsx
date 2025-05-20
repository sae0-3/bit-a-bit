import { LuShieldCheck } from 'react-icons/lu'

import { useQuestionFormStore } from '../stores/question-form.store'
import { Answer, Option } from '../types/form-question'

type VerifyButtonProps = {
  answer: Option[]
}

export const VerifyButton = (props: VerifyButtonProps) => {
  const { answers } = useQuestionFormStore()

  const isAnswerCorrect = (selected: Option[], correctAnswers: Answer[]): boolean => {
    return correctAnswers.some(answer => {
      const correctOptions = answer.options

      if (selected.length !== correctOptions.length) return false

      return selected.every((opt, index) => opt.id === correctOptions[index].id)
    })
  }

  const handleVerify = () => {
    const correct = isAnswerCorrect(props.answer, answers)
    alert(correct ? 'Respuesta correcta' : 'Respuesta incorrecta')
  }

  return (
    <button
      className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center gap-1"
      onClick={handleVerify}
    >
      <span>Verificar</span> <LuShieldCheck />
    </button>
  )
}
