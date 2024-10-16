import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@project/user';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    LocalStrategy,
  ]
})
export class AuthenticationModule { }
