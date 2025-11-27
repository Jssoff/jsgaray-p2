/* eslint-disable prettier/prettier */

import { Body, Controller, Get,  Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('location')
@UseGuards(ApiTokenGuard)
export class LocationController {
 constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }
}