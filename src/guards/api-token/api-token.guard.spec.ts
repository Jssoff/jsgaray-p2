/* eslint-disable prettier/prettier */
import { ApiTokenGuard } from './api-token.guard';
import { TokenService } from '../../token/token.service';

describe('ApiTokenGuard', () => {
  let guard: ApiTokenGuard;
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = {
      usable: jest.fn().mockReturnValue(true),
      reduce: jest.fn(),
    } as unknown as TokenService;

    guard = new ApiTokenGuard(tokenService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
