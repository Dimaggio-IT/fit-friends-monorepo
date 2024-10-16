import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ITokenPayload } from '@project/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: ITokenPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
