/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Character } from '../character/entities/character.entity';
import { Location } from 'src/location/entities/location.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CharacterService {
  constructor(
     private characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

    async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    await this.characterRepository.save(character);
    return character;
  }



}
