import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nombre de usuario</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="juan123"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="••••••"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Confirmar contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}
