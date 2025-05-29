import { Option, Answer } from "../types/form-question"

export const verifyResponseById = (selected: Option[], correctAnswers: Answer[]): boolean => {
  return correctAnswers.some(answer => {
    const correctOptions = answer.options

    if (selected.length !== correctOptions.length) return false

    return selected.every((opt, index) => opt.id === correctOptions[index].id)
  })
}

export const verifyResponseByResults = (firstNumber: string[], resultNumber: string[]): boolean => {
  console.log('firstNumber', firstNumber)
  console.log('resultNumber', resultNumber)
  if (firstNumber.length !== resultNumber.length) return false
  return firstNumber.every((num, index) => num === resultNumber[index])
}