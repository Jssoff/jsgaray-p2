/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateTokenDto {

  @IsString()
  token: string;             

  @IsOptional()
  @IsBoolean()
  active?: boolean;         
  @IsOptional()
  @IsNumber()
  reqLeft?: number;        
}
