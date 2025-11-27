/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationsController } from './location.controller';
import { TokenModule } from '../token/token.module';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';

@Module({
  imports: [TokenModule],
  controllers: [LocationsController],
  providers: [LocationService, ApiTokenGuard],
  exports: [LocationService],
})
export class LocationsModule {}