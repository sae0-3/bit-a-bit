import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString({ message: 'El título debe ser una cadena de texto válida' })
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto válida' })
  description?: string;

  @IsArray({ message: 'La secuencia inicial debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'La secuencia inicial no puede estar vacía' })
  @ArrayMinSize(1, {
    message: 'La secuencia inicial debe tener al menos un elemento',
  })
  initial_sequence: Array<number | string>;

  @IsOptional()
  @IsInt({ message: 'La edad mínima debe ser un número entero' })
  @Min(4, { message: 'La edad mínima debe ser al menos 4' })
  min_age?: number;

  @IsOptional()
  @IsInt({ message: 'La edad máxima debe ser un número entero' })
  @Min(4, { message: 'La edad máxima debe ser al menos 4' })
  max_age?: number;

  @IsArray()
  @IsInt({ each: true, message: 'Cada ID de patrón debe ser un número entero' })
  @ArrayNotEmpty({ message: 'Debes especificar al menos un patrón' })
  @IsOptional()
  pattern_ids?: number[];
}
