import { AddResponse } from './AddResponse'
import { DescriptionEditor } from './DescriptionEditor'
import { DropzoneImagesUpload } from './DropzoneImagesUpload'
import { Options } from './Options'

export const TeacherView = () => {
  return (
    <section className="flex w-full flex-col justify-center items-center gap-5 py-5">
      <h1 className="font-bold text-2xl">Crear Pregunta</h1>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <DescriptionEditor />
        </div>
        <div className="w-full lg:w-1/2">
          <DropzoneImagesUpload />
        </div>
      </div>

      <div className="w-10/12 flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <Options />
        </div>
        <div className="w-full lg:w-1/2">
          <AddResponse />
        </div>
      </div>
    </section>
  )
}
