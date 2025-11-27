/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable } from '@nestjs/common';
import { Character } from '../character/entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
      @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

    async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    await this.characterRepository.save(character);
    return character;
  }

  async addFavCharacter(characterId: number, locationId: number) {
    const character = await this.characterRepository.findOne({
      where: { id: characterId },
      relations: ['favPlaces'],
    });
    if (!character) {
      throw new BadRequestException('El personaje no se encontró');
    }
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });
    if (!location) {
      throw new BadRequestException('La locación no se encontró');
    }
    if (!character.favPlaces) {
      character.favPlaces = [];
    }
    character.favPlaces.push(location);
    await this.characterRepository.save(character);
    return character;
  }

    async getTaxes(characterId: number) {
  const character = await this.characterRepository.findOne({
    where: { id: characterId },
    relations: ['property'],
  });
  if (!character) throw new BadRequestException('Character not found');

  if (!character.property) {
    return { taxDebt: 0 };
  }

  const coef = character.employee ? 0.08 : 0.03;
  const taxDebt = character.property.cost * (1 + coef);
  return { taxDebt };
}

}
