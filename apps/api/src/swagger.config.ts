import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('GPU World API')
  .setDescription('API documentation for GPU World e-commerce platform')
  .setVersion('1.0')
  .addBearerAuth()
  .build(); 