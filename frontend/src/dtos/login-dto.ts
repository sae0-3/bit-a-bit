import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(1, 'El correo es requerido'),

  password: z
    .string(),
})
