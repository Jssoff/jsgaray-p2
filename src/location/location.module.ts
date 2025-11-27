/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TokenModule } from '../token/token.module';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { Character } from 'src/character/entities/character.entity';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Character]), TokenModule],
  controllers: [LocationController],
  providers: [LocationService, ApiTokenGuard],
  exports: [LocationService],
})
export class LocationModule {}