import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'

import { useState } from 'react'
import { useRegister } from '../hooks/useAuth'
import { registerSchema } from '../dtos/register-dto'
import { LuEye } from 'react-icons/lu'

import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
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

function RegisterComponent() {
  const [showPasswords, setShowPasswords] = useState<{ password: boolean; confirmPassword: boolean }>({
    password: false,
    confirmPassword: false,
  })
  const { mutate: register, isError } = useRegister()
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      register(value)
    },
    validators: {
      onSubmit: { ...registerSchema, },
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

        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <form.Field
              name="name"
              children={(field) => (
                <>
                  <label className="block mb-1 font-medium">Nombre de usuario</label>
                  <input
                    id={field.name}
                    value={field.state.value}
                    name={field.name}
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="juan123"
                    onChange={(e) => field.handleChange(e.target.value)}
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
          <div className="mb-4">
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <label className="block mb-1 font-medium">Correo electrónico</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
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
          <div className="mb-4">
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <label className="block mb-1 font-medium">Contraseña</label>
                  <div className='relative'>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPasswords.password ? 'text' : 'password'}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="••••••"
                    />
                    <LuEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => { setShowPasswords({ ...showPasswords, password: !showPasswords.password }) }} />
                  </div>
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
              name="confirmPassword"
              children={(field) => (
                <>
                  <label className="block mb-1 font-medium">Confirmar contraseña</label>
                  <div className='relative'>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPasswords.confirmPassword ? 'text' : 'password'}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="••••••"
                    />
                    <LuEye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                      onClick={() => { setShowPasswords({ ...showPasswords, confirmPassword: !showPasswords.confirmPassword }) }} />
                  </div>
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
            className="w-full bg-primary-dark text-white py-2 rounded hover:bg-secondary-1 hover:text-black transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}
