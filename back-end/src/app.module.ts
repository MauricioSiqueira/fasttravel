import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TravelsModule } from './travels/travels.module';

@Module({
  imports: [PrismaModule, AuthModule, TravelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
