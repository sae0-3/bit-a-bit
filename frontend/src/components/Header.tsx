import { Link } from '@tanstack/react-router'
import { IoIosLogOut } from "react-icons/io"

export const Header = () => {
  return (
    <header className="h-[10vh] bg-primary-dark">
      <div className="h-full w-10/12 max-w-4xl mx-auto text-white flex justify-between items-center gap-5">
        <Link to="/" className="font-black text-xl">
          QuestEditor
        </Link>

        <Link
          to="/login"
          className="flex justify-center items-center gap-1 py-2 px-4 border border-white/20 rounded-md hover:border-transparent hover:bg-primary-light/10 hover:text-white transition"
        >
          <p className="hidden lg:block">Cerrar Sesión</p>
          <IoIosLogOut className="" size={30} />
        </Link>
      </div>
    </header>
  )
}
