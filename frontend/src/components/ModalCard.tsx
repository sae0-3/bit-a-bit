import { ReactNode } from "react"
import { LuX } from 'react-icons/lu'

type ModalCardProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  footer?: ReactNode
  children: ReactNode
}

export const ModalCard = ({ title, isOpen, onClose, footer, children }: ModalCardProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-lg">

        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <LuX className="w-5 h-5" />
          </button>
        </header>

        <div className={`${footer ? 'mb-6' : 'mb-2'}`}>
          {children}
        </div>

        {footer && (
          <footer className="flex justify-around gap-2">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}