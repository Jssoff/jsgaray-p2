/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { TokenService } from '../token/token.service';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { CharacterService } from '../character/character.service';

@Controller('location')
@UseGuards(ApiTokenGuard)
export class LocationsController {
  constructor(
    private readonly ls: LocationService,
    private readonly cs: CharacterService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  create(@Body() body: { name: string; type: string; cost: number; ownerId: number }, @Req() req) {
    this.tokenService.reduce(req.tokenId);
    if (!body.ownerId && body.ownerId !== 0) throw new HttpException('La locación debe tener dueño', HttpStatus.BAD_REQUEST);
    try {
      const owner = this.cs.findById(body.ownerId);
      if (!owner) throw new HttpException('Dueño no existe', HttpStatus.BAD_REQUEST);
      const existing = this.ls.findByOwnerId(owner.id);
      if (existing) throw new HttpException('El dueño ya posee otra propiedad', HttpStatus.BAD_REQUEST);
      if (typeof body.cost !== 'number' || isNaN(body.cost)) throw new HttpException('Costo inválido', HttpStatus.BAD_REQUEST);
      const loc = this.ls.create({ name: body.name, type: body.type, cost: body.cost, owner });
      return loc;
    } catch (e) {
      throw new HttpException(e.message || 'Error', e.status ?? HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  allWithVisitors(@Req() req) {
    this.tokenService.reduce(req.tokenId);
    const locs = this.ls.all();
    const characters = this.cs.all();
    const result = locs.map((loc) => ({
      ...loc,
      visitors: characters
        .filter((c) => c.favPlaces && c.favPlaces.some((p) => p.id === loc.id))
        .map((c) => ({ id: c.id, name: c.name })),
    }));
    return result;
  }
}
