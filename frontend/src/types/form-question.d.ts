export interface Option {
  id: string
  value: string
}

export interface predefinedOption {
  id: string
  value: 'Ultimo a la izquierda' | 'Ultimo a la derecha' | 'Simetría'
  type: 'left' | 'right' | 'mirror'
}

export interface Answer {
  id: string
  name: string
  options: Option[]
}
