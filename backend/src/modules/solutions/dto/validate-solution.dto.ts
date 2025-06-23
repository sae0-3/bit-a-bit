import { IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class ValidateSolutionDto {
  @IsArray({ message: 'El path debe ser un arreglo de objetos con id y code' })
  @ArrayNotEmpty({ message: 'El path no puede estar vacío' })
  path: Array<string>;

  @IsUUID('4', { message: 'question_id debe ser un UUID válido' })
  solution_id: string;
}

