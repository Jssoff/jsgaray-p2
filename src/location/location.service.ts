/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from '../location/entities/location.entity';
import { Character } from 'src/character/entities/character.entity';

@Injectable()
export class LocationService {
  private places: Location[] = [];
  private seq = 1;

  create(datos: { name: string; type: string; cost: number; owner: Character }) {
    const loc: Location = {
      id: this.seq++,
      name: datos.name,
      type: datos.type,
      cost: datos.cost,
      owner: datos.owner,
      favCharacters: [],
    } as Location;
    this.places.push(loc);
    return loc;
  }

  findById(id: number) {
    const l = this.places.find((x) => x.id === id);
    if (!l) throw new NotFoundException('Locación no encontrada');
    return l;
  }

  findByOwnerId(ownerId: number): Location | null {
    return this.places.find((x) => x.owner && x.owner.id === ownerId) ?? null;
  }

  all() {
    return this.places;
  }
}
