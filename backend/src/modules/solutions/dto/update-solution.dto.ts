import { ArrayNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateSolutionDto {
  @IsOptional()
  @IsArray({ message: 'El path debe ser un arreglo de objetos con id y code' })
  @ArrayNotEmpty({ message: 'El path no puede estar vacío' })
  path?: Array<string>;
}
