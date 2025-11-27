/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Body('reqLeft') reqLeft: number) {
    const initial = reqLeft ?? 10;
    return this.tokenService.create(initial);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const token = this.tokenService.find(id);
    return { usable: token.active && token.reqLeft > 0, token };
  }

  @Patch('reduce/:id')
  reduce(@Param('id') id: string) {
    return this.tokenService.reduce(id);
  }

  
}