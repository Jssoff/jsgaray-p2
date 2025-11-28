/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('character')
@UseGuards(ApiTokenGuard)
export class CharacterController {
  constructor( private readonly cs: CharacterService,
  ) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.cs.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavoritePlace(
    @Param('id') id: string,
    @Param('locationId') locationId: string,
  ) {
    return this.cs.addFavCharacter(+id, +locationId);
  }

  @Get(':id/taxes')
  getTaxes(@Param('id') id: string) {
    return this.cs.getTaxes(+id);
  }
}
