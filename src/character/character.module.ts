/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharactersController } from './character.controller';
import { TokenModule } from '../token/token.module';
import { ApiTokenGuard } from '../guards/api-token/api-token.guard';


@Module({
  imports: [TokenModule],
  controllers: [CharactersController],
  providers: [CharacterService, ApiTokenGuard],
  exports: [CharacterService],
})
export class CharactersModule {}