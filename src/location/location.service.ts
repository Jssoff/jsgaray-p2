/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable} from '@nestjs/common';
import { Location } from '../location/entities/location.entity';
import { Character } from 'src/character/entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {

    constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

async create(createLocationDto: CreateLocationDto) {
    const owner = await this.characterRepository.findOne({
      where: { id: createLocationDto.ownerId },
      relations: ['property'],
    });
    if (!owner) {
      throw new BadRequestException('Owner not found');
    }
    if (owner.property) {
      throw new BadRequestException('Owner already has a property');
    }
    const location = this.locationRepository.create({
      name: createLocationDto.name,
      type: createLocationDto.type,
      cost: createLocationDto.cost,
      owner: owner,
    });
    await this.locationRepository.save(location);
    return location;
  }

async findAll() {
  return await this.locationRepository.find({
    relations: ['favCharacters'], 
  });
}

}
