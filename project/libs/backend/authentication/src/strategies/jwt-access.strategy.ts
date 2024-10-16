import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ITokenPayload } from '@project/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret')
    });
  }

  public async validate(payload: ITokenPayload) {
    return payload;
  }
}
