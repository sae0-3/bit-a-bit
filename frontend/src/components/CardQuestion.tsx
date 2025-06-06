import { Link } from '@tanstack/react-router'
import { CiEdit } from 'react-icons/ci'
import { GrView } from 'react-icons/gr'
import { IoIosRemove } from 'react-icons/io'

type CardQuestionProps = {
  id: string
  title: string
  min_age: number | null
  max_age: number | null
  updated_at: string
  created_at: string
}

export const CardQuestion = (props: CardQuestionProps) => {
  const handleRemoveQuestion = () => {
    console.log("Eliminando pregunta")
  }

  return (
    <div className="flex justify-between items-center gap-2 bg-primary-light p-1 rounde-lg shadow-md lg:p-4">
      <div className="flex flex-wrap flex-col gap-1">
        <p className="font-medium text-lg lg:text-xl">{props.title}</p>

        <p className="text-normal font-medium italic text-gray-600">
          {!props.min_age && !props.max_age ? (
            "Sin clasificación de edad"
          ) : !props.min_age ? (
            `Menores a ${props.max_age} años`
          ) : !props.max_age ? (
            `Mayores a ${props.min_age} años`
          ) : (
            `De ${props.min_age} a ${props.max_age} años`
          )}
        </p>

        <div className="flex flex-col text-sm gap-1">
          <p className="flex flex-col lg:flex-row lg:gap-1">
            <span className="font-medium">Creación:</span>
            <span>
              {new Date(props.created_at).toLocaleDateString('es-ES', { dateStyle: 'full' })}
            </span>
          </p>

          <p className="flex flex-col lg:flex-row lg:gap-1">
            <span className="font-medium">Actualización:</span>
            <span>
              {new Date(props.updated_at).toLocaleDateString('es-ES', { dateStyle: 'full' })}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-1 sm:flex-row lg:gap-2 flex-wrap">
        <Link to="/"
          className="bg-primary-dark rounded-lg flex items-center justify-center p-2 hover:cursor-pointer"
        >
          <GrView className="text-white" size={24} />
        </Link>

        <Link to="/"
          className="bg-green-800 rounded-lg flex items-center justify-center p-2 hover:cursor-pointer"
        >
          <CiEdit className="text-white" size={24} />
        </Link>

        <button onClick={handleRemoveQuestion}
          className="bg-red-800 rounded-lg flex items-center justify-center p-2 hover:cursor-pointer"
        >
          <IoIosRemove className="text-white" size={24} />
        </button>
      </div>
    </div>
  )
}
