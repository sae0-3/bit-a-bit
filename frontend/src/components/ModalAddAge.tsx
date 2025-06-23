import { useNavigate } from '@tanstack/react-router'
import { useEffect, } from 'react'
import { RiCloseLargeFill } from 'react-icons/ri'

import { useGetQuestionById, useUpdateQuestionById } from '../hooks/useQuestions'
import { FormAge } from './FormAge'

interface AddAgeProps {
  questionId: string
  isOpen: boolean
  onClose: () => void
}

export const ModalAddAge = ({ questionId, isOpen, onClose }: AddAgeProps) => {
  const { data: question, isLoading } = useGetQuestionById(questionId)
  const { mutate: update, isPending, isSuccess } = useUpdateQuestionById(questionId)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess)
      navigate({ to: '/' })
  }, [isSuccess])

  if (!isOpen || isLoading) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col gap-6 bg-white p-4 rounded-2xl shadow-2xl max-w-sm w-11/12 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <RiCloseLargeFill className="text-2xl" />
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800">Edad sugerida</h2>

        <FormAge update={update} minAge={question?.min_age} maxAge={question?.max_age} />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:cursor-pointer transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="form-age"
            className="px-4 py-2 rounded-lg bg-primary-dark text-white hover:bg-primary-dark/70 transition hover:cursor-pointer disabled:cursor-no-drop disabled:opacity-50"
            disabled={isPending}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
