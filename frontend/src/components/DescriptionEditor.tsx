import { DropzoneImagesUpload } from './DropzoneImagesUpload'

export const DescriptionEditor = () => {
  return (
    <div className="w-10/12 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="font-semibold"
        >
          Ingrese la descripción:
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          className="resize-none focus:outline-none border-b border-b-black pb-2"
        />
      </div>

      <DropzoneImagesUpload />
    </div>
  )
}
