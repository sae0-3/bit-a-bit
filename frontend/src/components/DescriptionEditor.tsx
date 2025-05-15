import { useRef } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'

export const DescriptionEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { description, setDescription } = useQuestionFormStore()

  const handleInput = () => {
    const el = textareaRef.current

    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight + 1}px`
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor="description"
        className="font-semibold text-lg"
      >
        Ingrese la descripción:
      </label>
      <textarea
        name="description"
        id="description"
        className="resize-none w-full border-b border-b-gray-300 focus:outline-none focus:border-b-black pb-1 max-h-50"
        ref={textareaRef}
        onInput={handleInput}
        rows={1}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  )
}
