import * as Joi from 'joi';

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
});

export class CreateProductDto {
  name: string;
  description: string;
  img_product: string[];
  height: number;
  length: number;
  width: number;
  brand: string;
  tier: string;
  price: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  img_product?: string[];
  height?: number;
  length?: number;
  width?: number;
  brand?: string;
  tier?: string;
  price?: number;
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
