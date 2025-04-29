import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { LuTrash2 } from 'react-icons/lu'

export const DropzoneImagesUpload = () => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop: (acceptedFiles: File[]) => {
      const readers = acceptedFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result
            if (typeof result === 'string') {
              resolve(result)
            } else {
              reject(new Error('Error leyendo archivo'))
            }
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(readers)
        .then((images) => {
          setImageSrcs((prev) => [...prev, ...images])
        })
        .catch((error) => {
          console.error('Error cargando imágenes:', error)
        })
    }
  })

  const handleRemoveImage = (index: number) => {
    setImageSrcs((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`flex items-center justify-center w-full h-12 border border-dashed md:h-20 ${isDragActive ? 'bg-gray-100' : ''}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-center">Arrastra o haz click para subir imágenes</p>
      </div>

      <div className="flex overflow-x-auto gap-4 w-full">
        {imageSrcs.map((src, index) => (
          <div key={index} className="relative w-24 h-24 shrink-0">
            <img
              src={src}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center bg-red-600 hover:cursor-pointer"
            >
              <LuTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
