/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['api-key'] as string | undefined;

    if (!apiKey) {
      throw new UnauthorizedException('API Key is required in api-key header');
    }
    
    await this.tokenService.validateAndReduceByToken(apiKey);

    return true;
  }
}
