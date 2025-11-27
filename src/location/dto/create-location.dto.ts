/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  ownerId: number;
}
