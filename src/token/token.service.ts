/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenEntity } from '../token/entities/token.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenService {
  private tokens = new Map<string, TokenEntity>();

  create(initialReqLeft = 10) {
    const id = uuid();
    const token: TokenEntity = { id, token:"1234dgb",active: true, reqLeft: initialReqLeft };
    this.tokens.set(id, token);
    return token;
  }

  find(id: string) {
    const t = this.tokens.get(id);
    if (!t) throw new NotFoundException('Token no encontrado');
    return t;
  }

  usable(id: string) {
    const t = this.find(id);
    return t.active && t.reqLeft > 0;
  }

  reduce(id: string) {
    const t = this.find(id);
    if (!t.active) throw new NotFoundException('Token inactivo');
    if (t.reqLeft <= 0) throw new NotFoundException('Token sin peticiones restantes');
    t.reqLeft = Math.max(0, t.reqLeft - 1);
    return t;
  }

}