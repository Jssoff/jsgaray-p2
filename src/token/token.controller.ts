/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  findOne(@Query('token') token: string) {
    return this.tokenService.find(token);
  }

  @Patch(':id/reduceReqLeft')
  reduceReqLeft(@Param('id') id: string) {
    return this.tokenService.reduce(id);
  }

  
}