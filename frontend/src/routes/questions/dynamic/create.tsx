import { createFileRoute, Link } from '@tanstack/react-router'
import { LuUserRoundPen } from 'react-icons/lu'

import { DescriptionEditor } from '../../../components/DescriptionEditor'
import { DropzoneImagesUpload } from '../../../components/DropzoneImagesUpload'
import { Options } from '../../../components/Options'

export const Route = createFileRoute('/questions/dynamic/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex w-full flex-col justify-center items-center gap-8 py-6">
      <div className="w-10/12 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <DescriptionEditor />
        </div>

        <div className="w-full lg:w-1/2">
          <DropzoneImagesUpload />
        </div>
      </div>

      <div className="w-10/12 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
        <div className="w-full lg:w-1/2">
          <Options />
        </div>
      </div>

      <Link
        to="/questions/dynamic/view"
        className="bg-primary-dark text-white p-2 rounded hover:cursor-pointer flex items-center gap-1"
      >
        <span>Vista de estudiante</span>
        <LuUserRoundPen />
      </Link>
    </div >
  )
}
