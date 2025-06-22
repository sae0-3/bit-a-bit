import { Link, useNavigate } from '@tanstack/react-router'
import { FaCheckCircle } from 'react-icons/fa'
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
    <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="w-10/12 max-w-4xl mx-auto h-16 flex items-center justify-between sm:h-20">
        <Link
          to="/"
          className="flex items-center gap-3 group hover:scale-105 transition-transform duration-200"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-dark to-secondary-1 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <FaCheckCircle className="text-primary-light text-2xl" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-primary-dark group-hover:text-secondary-1 transition-colors">
              QuestEditor
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 bg-primary-dark/5 hover:bg-accent-red/10 text-primary-dark hover:text-accent-red rounded-xl transition-all duration-200 border border-transparent hover:border-accent-red/20 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            <IoIosLogOut
              size={20}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="hidden sm:inline font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  )
}
