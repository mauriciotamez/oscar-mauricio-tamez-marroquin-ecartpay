import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export const CreateProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  height: Joi.number().positive().required(),
  length: Joi.number().positive().required(),
  width: Joi.number().positive().required(),
  brand: Joi.string().valid('NVIDIA', 'AMD').required(),
  tier: Joi.string().valid('high-end', 'mid-end', 'low-end').required(),
  price: Joi.number().positive().required()
});

export const UpdateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  height: Joi.number().positive().optional(),
  length: Joi.number().positive().optional(),
  width: Joi.number().positive().optional(),
  brand: Joi.string().valid('NVIDIA', 'AMD').optional(),
  tier: Joi.string().valid('high-end', 'mid-end', 'low-end').optional(),
  price: Joi.number().positive().optional()
}).min(1);

export class CreateProductDto {
  @ApiProperty({ example: 'NVIDIA GeForce RTX 4090', description: 'The name of the product' })
  name: string;

  @ApiProperty({ example: 'High-end graphics card with ray tracing', description: 'Product description' })
  description: string;

  @ApiProperty({ example: 14, description: 'Height in centimeters' })
  height: number;

  @ApiProperty({ example: 304, description: 'Length in millimeters' })
  length: number;

  @ApiProperty({ example: 137, description: 'Width in millimeters' })
  width: number;

  @ApiProperty({ example: 'NVIDIA', description: 'Brand name' })
  brand: string;

  @ApiProperty({ example: 'high-end', enum: ['high-end', 'mid-range', 'low-end'] })
  tier: string;

  @ApiProperty({ example: 19999, description: 'Price in cents' })
  price: number;
}



export class UpdateProductDto {
  id?: string;
  name?: string;
  description?: string;
  height?: number;
  length?: number;
  width?: number;
  brand?: string;
  tier?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  images?: { url: string }[];
}


export class ProductResponseDto {
  id: string;
  name: string;
  description: string;
  height: number;
  length: number;
  width: number;
  brand: string;
  tier: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  images: { url: string }[];
}
