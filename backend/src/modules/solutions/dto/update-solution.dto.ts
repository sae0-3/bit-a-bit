import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateSolutionDto {
  @IsOptional()
  @IsArray({ message: 'final_sequence debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'final_sequence no puede estar vacío' })
  final_sequence?: Array<number | string>;

  @IsOptional()
  @IsArray({ message: 'El path debe ser un arreglo de objetos con id y code' })
  @ArrayNotEmpty({ message: 'El path no puede estar vacío' })
  path?: Array<{ id: number; code: string }>;
}
