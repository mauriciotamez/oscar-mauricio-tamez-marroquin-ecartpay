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
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../pipes/file-size-validation.pipe';
import { Express } from 'express';
import { ProductsService } from '../products/products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly productsService: ProductsService,
  ) {}

  @ApiOperation({ summary: 'Upload a single file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File) {
    console.log(file);
    return this.filesService.uploadFile('uploads', file);
  }

  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    files.forEach(file => {
      this.filesService.uploadFile('uploads', file);
    });
    return { message: 'Files uploaded successfully' };
  }

  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete('delete')
  async deleteFile(@Body() body: { folder: string; fileName: string }) {
    await this.filesService.deleteFile(body.folder, body.fileName);
    return { message: 'File deleted successfully' };
  }

  @ApiOperation({ summary: 'List files in a folder' })
  @ApiResponse({ status: 200, description: 'List of files retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('list')
  async listFiles(@Query('folder') folder: string) {
    const files = await this.filesService.listFiles(folder);
    return files;
  }

  @ApiOperation({ summary: 'Upload files for a specific product' })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully for product' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
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
