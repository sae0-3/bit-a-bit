import { predefinedOption } from "../types/form-question";

const NumberOperation = {
  moveLastToLeft: (number: string[]) => {
    return () => {
      const firstNumber = number[0];
      if (firstNumber) {
        return [...number.slice(1), firstNumber];
      }
      return number;
    };
  },

  moveLastToRight: (number: string[]) => {
    return () => {
      const lastNumber = number[number.length - 1];
      if (lastNumber) {
        return [lastNumber, ...number.slice(0, -1)];
      }
      return number;
    };
  },

  applySymmetry: (number: string[]) => {
    return () => {
      return [...number].reverse();
    };
  }
};

export const applyNumberOperation = (number: string[], operation: predefinedOption) => {
  if (operation.type === 'left') {
    return NumberOperation.moveLastToLeft(number)();
  } else if (operation.type === 'right') {
    return NumberOperation.moveLastToRight(number)();
  } else if (operation.type === 'mirror') {
    return NumberOperation.applySymmetry(number)();
  }
  return number;
}