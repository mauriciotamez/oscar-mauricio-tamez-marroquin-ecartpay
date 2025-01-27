import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { ShippingController } from './shipping/shipping.controller';
import { ShippingService } from './shipping/shipping.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ShippingModule } from './shipping/shipping.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    FilesModule,
    ShippingModule,
    AuthModule
  ],
  controllers: [ProductsController, FilesController, ShippingController],
  providers: [ProductsService, FilesService, ShippingService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
