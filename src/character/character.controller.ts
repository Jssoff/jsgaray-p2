/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { CharacterService } from './character.service';
import { TokenService } from '../token/token.service';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { LocationService } from '../location/location.service';
import { NotFoundException } from '@nestjs/common';

@Controller('character')
@UseGuards(ApiTokenGuard)
export class CharactersController {
  constructor(
    private readonly cs: CharacterService,
    private readonly tokenService: TokenService,
    private readonly locationsService: LocationService,
  ) {}

  @Post()
  create(@Body() body: { name: string; salary: number; employee: boolean }, @Req() req) {
    this.tokenService.reduce(req.tokenId);
    if (!body.name) throw new HttpException('El personaje debe tener nombre', HttpStatus.BAD_REQUEST);
    if (typeof body.salary !== 'number' || isNaN(body.salary)) throw new HttpException('Salario inválido', HttpStatus.BAD_REQUEST);
    const c = this.cs.create({ name: body.name, salary: body.salary, employee: !!body.employee });
    return c;
  }

  @Patch(':id/favorites/:locationId')
  addFavorite(@Param('id') idStr: string, @Param('locationId') locationIdStr: string, @Req() req) {
    this.tokenService.reduce(req.tokenId);
    const id = Number(idStr);
    const locId = Number(locationIdStr);
    try {
      const character = this.cs.findById(id);
      const location = this.locationsService.findById(locId);
      if (!character) throw new NotFoundException('Personaje no existe');
      if (!location) throw new NotFoundException('Locación no existe');
      // favPlaces es Location[]: comprobar por id
      if (!character.favPlaces) character.favPlaces = [];
      const already = character.favPlaces.some((p) => p.id === location.id);
      if (!already) character.favPlaces.push(location);
      return character;
    } catch (e) {
      throw new HttpException(e.message || 'Error', e.status ?? HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/taxes')
  calculateTaxes(@Param('id') idStr: string, @Req() req) {
    this.tokenService.reduce(req.tokenId);
    const id = Number(idStr);
    const character = this.cs.findById(id);
    const owned = this.locationsService.findByOwnerId(id);
    if (!owned) return { taxDebt: 0 };
    const coef = character.employee ? 0.08 : 0.03;
    const tax = owned.cost * (1 + coef);
    return { taxDebt: tax };
  }
}
