import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import postgresConfig from './config/pgsql.config';

const ENV_FILE_PATH = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        applicationConfig,
        jwtConfig,
        postgresConfig,
      ],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class ConfigurationModule { }
