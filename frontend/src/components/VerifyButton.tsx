import { LuShieldCheck } from 'react-icons/lu'

import { verifyResponseByResults } from '../utils/validation'
import { predefinedOption } from '../types/form-question'
import { applyNumberOperation } from '../utils/optionFunction'

type VerifyButtonProps = {
  listAnswer: predefinedOption[]
  objetive: string[]
  initial: string[]
}

export const VerifyButton = (props: VerifyButtonProps) => {

  const handleVerify = () => {
    let answerNumber: string[] = props.initial;
    props.listAnswer.forEach((opt) => {
      answerNumber = applyNumberOperation(answerNumber, opt)
    })

    const correct = verifyResponseByResults(answerNumber, props.objetive)
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
