/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../token/token.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tokenId = req.headers['x-token-id'] as string;
    if (!tokenId) throw new UnauthorizedException('Token no proporcionado');
    try {
      const usable = this.tokenService.usable(tokenId);
      if (!usable) throw new UnauthorizedException('Token inválido o sin peticiones');
      req.tokenId = tokenId;
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message || 'Token inválido');
    }
  }
}
