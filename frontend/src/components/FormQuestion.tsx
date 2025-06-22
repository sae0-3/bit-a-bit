import { useEffect, useRef } from 'react'
import { AiOutlineAlignLeft } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { GoTag } from 'react-icons/go'
import { HiHashtag } from 'react-icons/hi2'
import { IoIosInformationCircleOutline } from 'react-icons/io'

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
      className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
      <div className="p-3 space-y-2.5 sm:p-6">
        <div className="flex items-center gap-3 pb-4 border-b border-secondary-gray/70">
          <div className="w-10 h-10 bg-primary-dark/10 rounded-xl flex items-center justify-center group-hover:bg-primary-dark/20 transition-colors">
            <FaEdit className="text-primary-dark text-xl" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary-dark">Información de la pregunta</h2>
            <p className="text-sm text-primary-dark/70">Completa los datos requeridos</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary-1/10 rounded-lg flex items-center justify-center">
              <GoTag className="w-4 h-4 text-secondary-1" />
            </div>
            <label htmlFor="title" className="font-medium text-primary-dark">
              Título de la pregunta <span className="text-accent-red">*</span>
            </label>
          </div>

          <input
            placeholder="Ingresa un título descriptivo..."
            type="text"
            name="title"
            id="title"
            className="w-full px-3 py-2 bg-white/50 backdrop-blur-sm border border-secondary-gray/30 rounded-xl focus:outline-none focus:border-secondary-1 focus:ring-2 focus:ring-secondary-1/20 transition-all duration-200 text-primary-dark placeholder-primary-dark/50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary-2/10 rounded-lg flex items-center justify-center">
              <AiOutlineAlignLeft className="w-4 h-4 text-secondary-1" />
            </div>
            <label htmlFor="description" className="font-medium text-primary-dark">
              Descripción (opcional)
            </label>
          </div>

          <textarea
            placeholder="Proporciona más detalles sobre la pregunta..."
            name="description"
            id="description"
            className="resize-none w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-secondary-gray/30 rounded-xl focus:outline-none focus:border-secondary-1 focus:ring-2 focus:ring-secondary-1/20 transition-all duration-200 text-primary-dark placeholder-primary-dark/50 max-h-50 lg:max-h-30"
            ref={textareaRef}
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-xs text-primary-dark/50 flex items-center gap-1">
            <IoIosInformationCircleOutline className="w-3 h-3" />
            Agrega contexto adicional que ayude a entender mejor la pregunta
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary-1/10 rounded-lg flex items-center justify-center">
              <HiHashtag className="w-4 h-4 text-secondary-1" />
            </div>
            <label htmlFor="numberGame" className="font-medium text-primary-dark">
              Secuencia numérica inicial <span className="text-accent-red">*</span>
            </label>
          </div>
          <input
            type="text"
            placeholder="Ejemplo: 123456..."
            name="numberGame"
            id="numberGame"
            className={`w-full px-4 py-3 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-200 text-primary-dark placeholder-primary-dark/50 ${!editable
              ? 'bg-secondary-gray/20 border-secondary-gray/30 cursor-not-allowed'
              : 'bg-white/50 border-secondary-gray/30 focus:border-secondary-1 focus:ring-2 focus:ring-secondary-1/20'
              }`}
            value={initialNumber.join('')}
            onChange={(e) => handleNumberInput(e.target.value)}
            required
            inputMode="numeric"
            aria-required="true"
            readOnly={!editable}
            disabled={!editable}
          />
          <p className="text-xs text-primary-dark/50 flex items-center gap-1">
            <IoIosInformationCircleOutline className="w-3 h-3" />
            Solo números, sin espacios ni caracteres especiales
          </p>
        </div>

        {showNumberCards && (
          <div className="mt-2">
            <NumberCards number={initialNumber} />
          </div>
        )}
      </div>
    </form>
  )
}
