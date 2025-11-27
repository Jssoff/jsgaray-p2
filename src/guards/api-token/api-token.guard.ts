/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class  ApiTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const tokenId = request.headers['api-key'] as string | undefined;

    if (!tokenId) {
      throw new UnauthorizedException('API Key is required in api-key header');
    }

    if (!this.tokenService.usable(tokenId)) {
      throw new UnauthorizedException('Token inválido o sin peticiones restantes');
    }

    this.tokenService.reduce(tokenId);

    return true;
  }
}

