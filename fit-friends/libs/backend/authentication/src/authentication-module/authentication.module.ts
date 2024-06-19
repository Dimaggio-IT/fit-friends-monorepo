import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { ShopUserModule } from '@project/shop-user';
import { getJwtOptions } from '@project/configuration';
import { MailModule } from '@project/mail';

import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    ShopUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    MailModule,
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
