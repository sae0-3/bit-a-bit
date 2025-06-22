import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),

  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),

  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),

  confirmPassword: z
    .string()
    .min(6, 'La confirmación de contraseña es requerida')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})
