import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { loginSchema } from '../dtos/login-dto'
import { useLogin } from '../hooks/useAuth'
import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (isAuthenticated()) {
      return redirect({
        to: '/',
        replace: true,
      })
    }
  },
})

function LoginComponent() {
  const { mutate: login, isPending, isError } = useLogin()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      login(value)
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
        <h2 className="text-lg font-bold mb-6 text-center">Question Editor</h2>

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

          {isError && (
            <p className="text-red-500 mb-4 text-center">Credenciales inválidas</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-dark text-white py-2 hover:bg-blue-700 hover:cursor-pointer transition rounded-md disabled:opacity-70"
          >
            {isPending ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
