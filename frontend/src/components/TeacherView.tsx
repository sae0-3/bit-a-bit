import { AddResponse } from './AddResponse'
import { DescriptionEditor } from './DescriptionEditor'
import { DropzoneImagesUpload } from './DropzoneImagesUpload'
import { Options } from './Options'

export const TeacherView = () => {
  const handleCancel = () => { }

  const handleCreateQuestion = () => { }

  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-5 lg:gap-10">
      <h1 className="font-bold text-2xl">Registra tu pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-10">
        <div className="w-full lg:w-1/2">
          <DescriptionEditor />
        </div>
        <div className="w-full lg:w-1/2">
          <DropzoneImagesUpload />
        </div>
      </div>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-10">
        <div className="w-full lg:w-1/2">
          <Options />
        </div>
        <div className="w-full lg:w-1/2">
          <AddResponse />
        </div>
      </div>

      <div className="w-10/12 flex justify-between items-center gap-2 flex-wrap">
        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center gap-1"
          onClick={handleCreateQuestion}
        >
          <span>Registrar pregunta</span>
        </button>
        <button
          className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:cursor-pointer flex items-center justify-center gap-1"
          onClick={handleCancel}
        >
          <span>Cancelar</span>
        </button>
      </div>
    </section>
  )
}
