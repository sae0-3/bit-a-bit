import { useRef } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'

export const DescriptionEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { title, description, setTitle, setDescription } = useQuestionFormStore()

  const handleInput = () => {
    const el = textareaRef.current

    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight + 1}px`
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
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
          placeholder="Descripción del pregunta..."
          name="description"
          id="description"
          className="resize-none w-full border-b-2 border-b-gray-300 focus:outline-none focus:border-b-black pb-1 max-h-50 overflow-y-hidden"
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  )
}
