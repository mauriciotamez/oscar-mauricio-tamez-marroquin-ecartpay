import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const maxSize = 1000000;
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds the limit');
    }
    return file;
  }
}
