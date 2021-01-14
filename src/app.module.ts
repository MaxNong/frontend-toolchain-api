import { Module } from '@nestjs/common';
import { ApiToTsModule } from './api-to-ts/api-to-ts.module';

@Module({
  imports: [ApiToTsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}