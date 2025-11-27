/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from '../character/entities/character.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class CharacterService {
  private items: Character[] = [];
  private seq = 1;

  create(data: { name: string; salary: number; employee: boolean }) {
    const c: Character = {
      id: this.seq++,
      name: data.name,
      salary: data.salary,
      employee: !!data.employee,
      property: null,
      favPlaces: [],
    } as Character;
    this.items.push(c);
    return c;
  }

  findById(id: number) {
    const c = this.items.find((x) => x.id === id);
    if (!c) throw new NotFoundException('Personaje no encontrado');
    return c;
  }

  update(id: number, data: Partial<Character>) {
    const c = this.findById(id);
    Object.assign(c, data);
    return c;
  }

  all() {
    return this.items;
  }

  addFavorite(characterId: number, location: Location) {
    const c = this.findById(characterId);
    if (!c.favPlaces) c.favPlaces = [];
    const exists = c.favPlaces.some((p) => p.id === location.id);
    if (!exists) c.favPlaces.push(location);
    return c;
  }

  removeFavorite(characterId: number, locationId: number) {
    const c = this.findById(characterId);
    if (!c.favPlaces) return c;
    c.favPlaces = c.favPlaces.filter((p) => p.id !== locationId);
    return c;
  }
}
