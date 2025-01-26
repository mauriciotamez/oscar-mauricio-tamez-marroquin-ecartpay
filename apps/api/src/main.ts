import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, '0.0.0.0');

  console.log('\n🚀 Services are running at:');
  console.log(`📡 API: http://localhost:3000`);
  console.log(`🌐 Web: http://localhost:3002`);
}
bootstrap();
