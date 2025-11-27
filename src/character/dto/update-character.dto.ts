/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsString()
  name: string;
  @Type(() => Number)
  @IsNumber()
  salary: number;
    
  @Type(() => Boolean)
  @IsBoolean()
  employee: boolean;
}