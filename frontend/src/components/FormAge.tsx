import { useState } from 'react'

interface FormAgeProps {
  minAge?: number | null
  maxAge?: number | null
  update: (data: { min_age?: number | null, max_age?: number | null }) => void
}

export const FormAge = ({ update, ...props }: FormAgeProps) => {
  const [minAge, setMinAge] = useState(props.minAge)
  const [maxAge, setMaxAge] = useState(props.maxAge)
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (minAge !== undefined &&
      minAge !== null &&
      maxAge !== undefined &&
      maxAge !== null &&
      maxAge < minAge) {
      setError("La edad máxima debe ser mayor o igual a la mínima")
      return
    }

    setError("")
    update({
      min_age: minAge === undefined ? null : minAge,
      max_age: maxAge === undefined ? null : maxAge,
    })
  }

  const handleMinAgeChange = (inputValue: string) => {
    const value = inputValue === '' ? undefined : Number(inputValue)
    setMinAge(value)
    if (value !== undefined &&
      value !== null &&
      maxAge !== undefined &&
      maxAge !== null &&
      value <= maxAge) {
      setError("")
    }
  }

  const handleMaxAgeChange = (inputValue: string) => {
    const value = inputValue === '' ? undefined : Number(inputValue)
    setMaxAge(value)
    if (value !== undefined &&
      value !== null &&
      minAge !== undefined && minAge !== null && value >= minAge) {
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
            max={20}
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
