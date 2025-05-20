import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentFill } from 'react-icons/pi'

import { StudentView } from '../../../components/StudentView'
import { TeacherView } from '../../../components/TeacherView'

export const Route = createFileRoute('/questions/dynamic/create')({
  component: CreateQuestionComponent,
})

function CreateQuestionComponent() {
  const [isStudentView, setIsStudentView] = useState(false)

  return (
    <>
      {isStudentView ? <StudentView /> : <TeacherView />}

      <button
        className="fixed bottom-4 right-4 bg-primary-dark text-white rounded-full aspect-square p-4 text-3xl cursor-pointer"
        onClick={() => setIsStudentView((prev) => !prev)}
      >
        {isStudentView ? (
          <PiStudentFill />
        ) : (
          <FaChalkboardTeacher />
        )}
      </button>
    </>
  )
}
