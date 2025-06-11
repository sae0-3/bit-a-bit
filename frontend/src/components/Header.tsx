import { Link } from '@tanstack/react-router'
import { FaUserCircle } from 'react-icons/fa'
import { useQuestionFormStore } from '../stores/question-form.store'

export const Header = () => {
  const { resetForm } = useQuestionFormStore()
  return (
    <header className="h-[10vh] bg-primary-dark">
      <div className="h-full w-10/12 mx-auto text-white flex justify-between items-center">
        <Link to="/" onClick={() => { resetForm() }} className="font-black text-xl">
          Question Editor
        </Link>

        <Link to="/login" >
          <FaUserCircle size={32} />
        </Link>
      </div>
    </header>
  )
}
