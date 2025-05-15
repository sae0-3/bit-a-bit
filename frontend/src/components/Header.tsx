import { Link } from '@tanstack/react-router'
import { FaUserCircle } from 'react-icons/fa'

export const Header = () => {
  return (
    <header className="h-[10vh] bg-primary-dark">
      <div className="h-full w-10/12 mx-auto text-white flex justify-between items-center">
        <Link to="/" className="font-black text-xl">
          Question Editor
        </Link>

        <Link to="/" disabled >
          <FaUserCircle size={32} />
        </Link>
      </div>
    </header>
  )
}
