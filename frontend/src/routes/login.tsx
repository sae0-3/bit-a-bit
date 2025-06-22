import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { FaCheckCircle, FaLock, FaUser, FaUserPlus } from 'react-icons/fa'
import { LuAtSign, LuEye, LuEyeOff } from 'react-icons/lu'

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
  const [showPassword, setShowPassword] = useState(false)

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
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 flex flex-col justify-center items-center">
          <div className="w-14 aspect-square bg-gradient-to-br from-primary-dark to-secondary-1 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <FaCheckCircle className="text-primary-light text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-primary-dark mb-1 mt-0.5">QuestEditor</h1>
          <p className="text-primary-dark/70 text-sm">Accede a tu cuenta para continuar</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
          <form onSubmit={handleSubmit} className="space-y-3 p-6">
            <div className="space-y-2">
              <form.Field
                name="email"
                children={(field) => (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary-1/10 rounded-lg flex items-center justify-center">
                        <LuAtSign className="w-4 h-4 text-secondary-1" />
                      </div>
                      <label htmlFor={field.name} className="font-medium text-primary-dark">
                        Correo electrónico <span className="text-accent-red">*</span>
                      </label>
                    </div>
                    <input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-secondary-gray/30 rounded-xl focus:outline-none focus:border-secondary-1 focus:ring-2 focus:ring-secondary-1/20 transition-all duration-200 text-primary-dark placeholder-primary-dark/50"
                      placeholder="correo@ejemplo.com"
                      required
                      aria-required="true"
                    />
                    {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                      <p className="text-accent-red text-sm flex items-center gap-1 mt-1">
                        <AiOutlineExclamationCircle className="text-lg" />
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <form.Field
                name="password"
                children={(field) => (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary-2/10 rounded-lg flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-secondary-1" />
                      </div>
                      <label htmlFor={field.name} className="font-medium text-primary-dark">
                        Contraseña <span className="text-accent-red">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? 'text' : 'password'}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-secondary-gray/30 rounded-xl focus:outline-none focus:border-secondary-1 focus:ring-2 focus:ring-secondary-1/20 transition-all duration-200 text-primary-dark placeholder-primary-dark/50"
                        placeholder="••••••••"
                        required
                        aria-required="true"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-dark/50 hover:text-secondary-1 transition-colors duration-200 p-1 rounded-lg hover:bg-secondary-1/10 hover:cursor-pointer"
                        title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      </button>
                    </div>
                    {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                      <p className="text-accent-red text-sm flex items-center gap-1 mt-1">
                        <AiOutlineExclamationCircle className="text-lg" />
                        {field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {isError && (
              <div className="bg-accent-red/10 border border-accent-red/20 rounded-xl p-4">
                <p className="text-accent-red text-sm flex items-center gap-2">
                  <AiOutlineExclamationCircle className="text-xl" />
                  Credenciales inválidas. Verifica tu correo y contraseña.
                </p>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary-dark hover:bg-primary-dark/90 disabled:bg-primary-dark/50 text-primary-light py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed font-medium hover:cursor-pointer"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Cargando...
                  </>
                ) : (
                  <>
                    <FaUser size={16} />
                    Ingresar
                  </>
                )}
              </button>

              <Link
                to="/register"
                className="flex justify-center items-center gap-2 text-primary-dark/70 hover:text-primary-dark text-sm transition-colors duration-200"
              >
                <FaUserPlus size={16} />
                ¿No tienes cuenta?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
