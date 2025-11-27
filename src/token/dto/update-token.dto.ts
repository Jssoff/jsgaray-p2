/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/swagger';
import { CreateTokenDto } from './create-token.dto';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';


export class UpdateTokenDto extends PartialType(CreateTokenDto) {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
