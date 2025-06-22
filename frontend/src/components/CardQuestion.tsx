import { Link } from '@tanstack/react-router'
import { BsQuestionCircle } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'
import { FaEdit, FaPlus, FaRegTrashAlt, FaUser, FaUserTimes } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'

import { useDeleteQuestionById } from '../hooks/useQuestions'

type CardQuestionProps = {
  id: string
  title: string
  min_age: number | null
  max_age: number | null
  updated_at: string
  created_at: string
}

export const CardQuestion = (props: CardQuestionProps) => {
  const { mutate: remove, isPending } = useDeleteQuestionById(props.id)

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta pregunta? Esta acción no se puede deshacer.')) {
      remove()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAgeRangeText = () => {
    if (!props.min_age && !props.max_age) {
      return "Sin clasificación de edad"
    } else if (!props.min_age) {
      return `Menores a ${props.max_age} años`
    } else if (!props.max_age) {
      return `Mayores a ${props.min_age} años`
    } else {
      return `De ${props.min_age} a ${props.max_age} años`
    }
  }

  const getAgeRangeIcon = () => {
    return (!props.min_age && !props.max_age)
      ? <FaUserTimes size={20} />
      : <FaUser size={20} />
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 hover:shadow-2xl transition-all duration-300 group lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-dark/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-dark/20 transition-colors">
              <BsQuestionCircle size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg lg:text-xl font-bold text-primary-dark leading-tight">
                {props.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-secondary-1">
            {getAgeRangeIcon()}
            <span className="text-sm font-medium">{getAgeRangeText()}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary-1/10 rounded-lg flex items-center justify-center">
                <FaPlus className="text-secondary-1" />
              </div>
              <div>
                <p className="font-medium text-primary-dark">Creada</p>
                <p className="text-primary-dark/70">{formatDate(props.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary-2/10 rounded-lg flex items-center justify-center">
                <FaEdit className="text-secondary-1" />
              </div>
              <div>
                <p className="font-medium text-primary-dark">Actualizada</p>
                <p className="text-primary-dark/70">{formatDate(props.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-3 justify-center lg:justify-start lg:gap-1.5">
          <Link
            to="/questions/preview/$questionId"
            params={{ questionId: `${props.id}` }}
            className="bg-primary-dark hover:bg-primary-dark/90 text-primary-light p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/btn"
            title="Ver pregunta"
          >
            <GrView size={20} className="group-hover/btn:scale-110 transition-transform" />
          </Link>

          <Link
            to="/questions/edit/$questionId"
            params={{ questionId: `${props.id}` }}
            className="bg-secondary-1 hover:bg-secondary-1/90 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/btn"
            title="Editar pregunta"
          >
            <CiEdit size={20} className="group-hover/btn:scale-110 transition-transform" />
          </Link>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-accent-red hover:bg-accent-red/90 disabled:bg-accent-red/50 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed group/btn hover:cursor-pointer"
            title="Eliminar pregunta"
          >
            <FaRegTrashAlt size={20} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
