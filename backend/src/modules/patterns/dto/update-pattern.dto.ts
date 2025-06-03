import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePatternDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto válida' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto válida' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo "is_active" debe ser un valor booleano' })
  is_active?: boolean;

  @IsOptional()
  @IsInt({ message: 'La complejidad debe ser un número entero' })
  @Min(1, { message: 'La complejidad mínima permitida es 1' })
  complexity?: number;
}
