import { useState } from 'react'

import { useQuestionFormStore } from '../stores/question-form.store'

export const DescriptionStudent = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { description, images } = useQuestionFormStore()

  return (
    <>
      <section className={`w-10/12 flex flex-col ${images.length > 0 ? 'gap-4' : ''}`}>
        <p>{description}</p>

        <div className="flex overflow-x-auto gap-3 md:gap-4 w-full">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative shrink-0 w-32 h-32"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover rounded border border-gray-200"
              />
            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  )
}
