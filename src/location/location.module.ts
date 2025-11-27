/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TokenModule } from '../token/token.module';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';

@Module({
  imports: [TokenModule],
  controllers: [LocationController],
  providers: [LocationService, ApiTokenGuard],
  exports: [LocationService],
})
export class LocationModule {}