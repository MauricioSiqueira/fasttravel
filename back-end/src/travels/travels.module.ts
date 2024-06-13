import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TravelsController],
  providers: [TravelsService]
})
export class TravelsModule {}
