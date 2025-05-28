import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

import { loginSchema } from '../dtos/login-dto'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Iniciando Sesión...', value)
    },
    validators: {
      onChange: loginSchema,
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.handleSubmit(e)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block mb-1 font-medium">Correo</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="correo@ejemplo.com"
                  />

                  {!field.state.meta.isValid && (
                    <p className="text-red-500">
                      {(field.state.meta.errors[0]?.message)}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-6">
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <label htmlFor={field.name} className="block mb-1 font-medium">Contraseña</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="••••••••"
                  />

                  {!field.state.meta.isValid && (
                    <p className="text-red-500">
                      {(field.state.meta.errors[0]?.message)}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-dark text-white py-2 hover:bg-blue-700 hover:cursor-pointer transition rounded-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
