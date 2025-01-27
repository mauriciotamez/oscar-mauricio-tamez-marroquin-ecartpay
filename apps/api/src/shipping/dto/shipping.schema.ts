import * as Joi from 'joi';

const AddressSchema = Joi.object({
  name: Joi.string().required(),
  company: Joi.string().allow('').optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  district: Joi.string().allow('').optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().allow('').optional(),
  postalCode: Joi.string().required(),
  reference: Joi.string().allow('').optional(),
  coordinates: Joi.object({
    latitude: Joi.string().optional(),
    longitude: Joi.string().optional()
  }).optional()
});

const DimensionsSchema = Joi.object({
  length: Joi.number().required(),
  width: Joi.number().required(),
  height: Joi.number().required()
});

const PackageSchema = Joi.object({
  content: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid('box', 'envelope', 'pallet').required(),
  dimensions: DimensionsSchema.required(),
  weight: Joi.number().required(),
  weightUnit: Joi.string().valid('KG', 'LB').required(),
  lengthUnit: Joi.string().valid('CM', 'IN').required()
});

export const ShippingLabelRequestSchema = Joi.object({
  origin: AddressSchema.required(),
  destination: AddressSchema.required(),
  packages: Joi.array().items(PackageSchema).min(1).required(),
  shipment: Joi.object({
    carrier: Joi.string().required(),
    service: Joi.string().required(),
    type: Joi.number().required()
  }).required()
});

export const ShippingQuoteRequestSchema = Joi.object({
  destination: AddressSchema.required(),
  packages: Joi.array().items(PackageSchema).min(1).required(),
  shipment: Joi.object({
    carrier: Joi.string().required(),
    service: Joi.string().required(),
    type: Joi.number().required()
  }).required()
}); 