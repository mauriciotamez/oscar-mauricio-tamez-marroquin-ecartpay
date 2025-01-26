import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import Joi from 'joi';
export type ObjectSchema = Joi.ObjectSchema;

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed: ' + error.message);
    }
    return value;
  }
}
