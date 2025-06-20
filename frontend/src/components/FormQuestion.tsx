import { useEffect, useRef } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'
import { NumberCards } from './NumberCards'

interface FormQuestionProps {
  formId: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  initialValues?: {
    title?: string
    description?: string
    sequence?: string[]
  }
  editable?: boolean
}

export const FormQuestion = ({
  formId,
  onSubmit,
  initialValues = {
    title: '',
    description: '',
    sequence: [],
  },
  editable = true
}: FormQuestionProps) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    initialNumber,
    setInitialNumber,
  } = useQuestionFormStore()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const showNumberCards = initialNumber.length > 0

  useEffect(() => {
    if (initialValues.title !== undefined)
      setTitle(initialValues.title)
    if (initialValues.description !== undefined)
      setDescription(initialValues.description)
    if (initialValues.sequence !== undefined)
      setInitialNumber(initialValues.sequence)
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [description])

  const handleNumberInput = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setInitialNumber(numericValue.split('').filter(Boolean))
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="title"
          className="font-semibold text-lg"
        >
          Ingrese el título: <span className="font-extrabold text-red-500">*</span>
        </label>
        <input
          placeholder="Título de la pregunta"
          type="text"
          name="title"
          id="title"
          className="w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-required="true"
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="description"
          className="font-semibold text-lg"
        >
          Ingrese la descripción:
        </label>
        <textarea
          placeholder="Descripción de la pregunta..."
          name="description"
          id="description"
          className="resize-none w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1 max-h-50 overflow-y-hidden"
          ref={textareaRef}
          rows={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-describedby="description-help"
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label
          htmlFor="numberGame"
          className="font-semibold text-lg"
        >
          Ingrese la secuencia inicial: <span className="font-extrabold text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Secuencia inicial (123...)"
          name="numberGame"
          id="numberGame"
          className={`w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1 ${!editable ? 'text-gray-400 cursor-not-allowed' : ''}`}
          value={initialNumber.join('')}
          onChange={(e) => handleNumberInput(e.target.value)}
          required
          inputMode="numeric"
          aria-required="true"
          readOnly={!editable}
          disabled={!editable}
        />
      </div>

      {showNumberCards && <NumberCards number={initialNumber} />}
    </form>
  )
}
