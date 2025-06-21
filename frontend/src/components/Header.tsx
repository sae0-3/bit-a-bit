import { Link, useNavigate } from '@tanstack/react-router'
import { IoIosLogOut } from 'react-icons/io'

import { useAuthStore } from '../stores/auth.store'

export const Header = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <header className="h-[10vh] bg-primary-dark">
      <div className="h-full w-10/12 max-w-4xl mx-auto text-white flex justify-between items-center gap-5">
        <Link to="/" className="font-black text-xl">
          QuestEditor
        </Link>

        <button
          onClick={handleLogout}
          className="flex justify-center items-center gap-1 py-2 px-4 border border-white/20 rounded-md hover:border-transparent hover:bg-primary-light/10 hover:text-white hover:cursor-pointer transition"
        >
          <p className="hidden lg:block">Cerrar Sesión</p>
          <IoIosLogOut className="" size={30} />
        </button>
      </div>
    </header>
  )
}
