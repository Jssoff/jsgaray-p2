/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @Type(() => Number)
  @IsNumber()
  cost: number;

  @Type(() => Number)
  @IsNumber()
  ownerId: number;
}
