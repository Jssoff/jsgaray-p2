/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TokenModule } from '../token/token.module';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Character, Location]), TokenModule],
  controllers: [CharacterController],
  providers: [CharacterService, ApiTokenGuard],
})
export class CharactersModule {}