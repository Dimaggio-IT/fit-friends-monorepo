import { Module } from '@nestjs/common';

import { ProductModule } from '@project/product';
import { AuthenticationModule } from '@project/authentication'
import { ConfigurationModule } from '@project/configuration';

@Module({
  imports: [
    ConfigurationModule,
    AuthenticationModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
