import { Answer, Option } from '../types/form-question'
import { ModalCard } from './ModalCard'

type ModalResponseProps = {
  response: Answer
  onClose: () => void
}

export const ModalResponse = ({ response, onClose }: ModalResponseProps) => {
  return (
    <ModalCard
      title={response.name}
      isOpen={true}
      onClose={onClose}
      footer={
        <div className="w-1/2">
          <button
            className="w-full bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1 justify-center"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {response.options.map((opt: Option) => (
          <div
            key={opt.id}
            className="p-2 border rounded cursor-default"
          >
            {opt.value}
          </div>
        ))}
      </div>
    </ModalCard>
  )
}

