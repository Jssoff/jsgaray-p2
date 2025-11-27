/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
      @IsString()
      name: string;
    
      @IsString()
      type: string;
    
      @IsNumber()
      cost: number;
    
}
