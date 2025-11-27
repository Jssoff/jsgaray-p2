/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  salary: number;

  @Type(() => Boolean)
  @IsBoolean()
  employee: boolean;
}
