import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;
  const DOMAIN = 'localhost';

  app.useGlobalPipes( new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    }
  ));
  
  await app.listen( PORT );
  const logger = new Logger( 'bootstrap' );
  logger.log(`\n✅ Server running at http://${DOMAIN}:${PORT}/`);
}
bootstrap();
