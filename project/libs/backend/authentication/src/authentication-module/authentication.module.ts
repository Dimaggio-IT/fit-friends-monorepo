import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserModule } from '@project/user';
import { getJwtOptions } from '@project/configuration';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
  ]
})
export class AuthenticationModule { }
