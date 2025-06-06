import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class CreateSolutionDto {
  @IsUUID('4', { message: 'question_id debe ser un UUID válido' })
  question_id: string;

  @IsArray({ message: 'final_sequence debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'final_sequence no puede estar vacío' })
  final_sequence: Array<number | string>;

  @IsArray({ message: 'El path debe ser un arreglo de objetos con id y code' })
  @ArrayNotEmpty({ message: 'El path no puede estar vacío' })
  path: Array<{ id: number; code: string }>;
}
