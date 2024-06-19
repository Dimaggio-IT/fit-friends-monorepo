import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/app.config';
import jwtConfig from './configurations/jwt.config';
import mailConfig from './configurations/mail.config';
import postgresConfig from './configurations/pgsql.config';

const ENV_FILE_PATH = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        jwtConfig,
        mailConfig,
        postgresConfig,
      ],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class ConfigurationModule { }
