import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';

@Module({
  imports: [FilesModule],
  controllers: [ProductsController, FilesController],
  providers: [ProductsService, FilesService],
})
export class AppModule {}
