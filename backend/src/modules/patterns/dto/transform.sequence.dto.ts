import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class TransformSequenceDto {
  @IsArray()
  @ArrayNotEmpty()
  sequence: Array<string | number>;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  path: string[];

  @IsArray()
  @ArrayNotEmpty()
  ids?: Array<string | number>;
}
