import { useState } from 'react'

interface FormAgeProps {
  update: (data: { min_age: number | undefined, max_age: number | undefined }) => void
}

export const FormAge = ({ update }: FormAgeProps) => {
  const [minAge, setMinAge] = useState<number | undefined>()
  const [maxAge, setMaxAge] = useState<number | undefined>()
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (minAge !== undefined && maxAge !== undefined && maxAge < minAge) {
      setError("La edad máxima debe ser mayor o igual a la mínima")
      return
    }

    setError("")
    update({
      min_age: minAge,
      max_age: maxAge,
    })
  }

  const handleMinAgeChange = (inputValue: string) => {
    const value = inputValue === '' ? undefined : Number(inputValue)
    setMinAge(value)
    if (value !== undefined && maxAge !== undefined && value <= maxAge) {
      setError("")
    }
  }

  const handleMaxAgeChange = (inputValue: string) => {
    const value = inputValue === '' ? undefined : Number(inputValue)
    setMaxAge(value)
    if (value !== undefined && minAge !== undefined && value >= minAge) {
      setError("")
    }
  }

  return (
    <form onSubmit={handleSubmit} id="form-age" className="flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col flex-1 gap-1 items-center">
          <input
            type="number"
            min={4}
            value={minAge ?? ''}
            onChange={(e) => handleMinAgeChange(e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <span className="text-gray-500 self-center">a</span>

        <div className="flex flex-col flex-1 gap-1 items-center">
          <input
            type="number"
            min={4}
            max={20}
            value={maxAge ?? ''}
            onChange={(e) => handleMaxAgeChange(e.target.value)}
            className="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary-dark"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}
    </form>
  )
}
