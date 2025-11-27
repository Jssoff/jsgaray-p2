/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, IsNumber, IsNotEmpty} from 'class-validator';

export class CreateTokenDto {

  @IsString()
  @IsNotEmpty()
  token: string;             

  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;   


  @IsNumber()
  @IsNotEmpty()
  reqLeft?: number;        
}
