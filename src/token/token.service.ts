/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from '../token/entities/token.entity';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(createApitokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createApitokenDto);
    await this.tokenRepository.save(token);
    return {
      id: token.id,
      token: token.token,
      active: token.active,
      reqLeft: token.reqLeft,
    };
  }

  async find(id: string) {
    const token = await this.tokenRepository.findOneBy({ id });
    if (!token) throw new NotFoundException('Token no encontrado');
    return token;
  }

  async usable(id: string) {
    const token = await this.find(id);
    return token.active && token.reqLeft > 0;
  }

  async reduce(id: string) {
    const token = await this.find(id);
    if (!token.active) throw new BadRequestException('Token inactivo');
    if (token.reqLeft <= 0) throw new BadRequestException('Token sin peticiones restantes');
    token.reqLeft = Math.max(0, token.reqLeft - 1);
    return await this.tokenRepository.save(token);
  }
}
