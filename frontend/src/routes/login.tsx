import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Correo</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
