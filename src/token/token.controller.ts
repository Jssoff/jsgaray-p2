/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get(':id')
  usable(@Param('id') id: string) {
    return this.tokenService.usable(id);
  }


  @Patch('reduce/:id')
  reduceReqLeft(@Param('id') id: string) {
    return this.tokenService.reduce(id);
  }

}