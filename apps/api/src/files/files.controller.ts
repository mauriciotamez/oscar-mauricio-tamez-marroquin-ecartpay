import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../pipes/file-size-validation.pipe';
import { Express } from 'express';
import { ProductsService } from '../products/products.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly productsService: ProductsService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File) {
    console.log(file);
    return this.filesService.uploadFile('uploads', file);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    files.forEach(file => {
      this.filesService.uploadFile('uploads', file);
    });
    return { message: 'Files uploaded successfully' };
  }

  @Delete('delete')
  async deleteFile(@Body() body: { folder: string; fileName: string }) {
    await this.filesService.deleteFile(body.folder, body.fileName);
    return { message: 'File deleted successfully' };
  }

  @Get('list')
  async listFiles(@Query('folder') folder: string) {
    const files = await this.filesService.listFiles(folder);
    return files;
  }

  @Post('upload-for-product/:id')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFilesForProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const fileUrls = await Promise.all(
      files.map(file => this.filesService.uploadFile('uploads', file))
    );

    await this.productsService.updateProductFiles(id, fileUrls);
    
    return { message: 'Files uploaded successfully for product', fileUrls };
  }
}
