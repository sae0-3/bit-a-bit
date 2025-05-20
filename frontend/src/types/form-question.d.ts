export interface Option {
  id: string
  value: string
}

export interface Answer {
  id: string
  name: string
  options: Option[]
}
