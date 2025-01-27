import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingQuoteRequestDto, ShippingLabelRequestDto } from './dto/shipping.dto';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import { ShippingQuoteRequestSchema, ShippingLabelRequestSchema } from './dto/shipping.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Shipping')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @ApiOperation({ summary: 'Get shipping quote' })
  @ApiResponse({ status: 201, description: 'Quote generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @Post('quote')
  @UsePipes(new JoiValidationPipe(ShippingQuoteRequestSchema))
  async getQuote(@Body() quoteRequest: ShippingQuoteRequestDto) {
    return this.shippingService.getQuote(quoteRequest);
  }

  @ApiOperation({ summary: 'Generate shipping label' })
  @ApiResponse({ status: 201, description: 'Label generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @Post('label')
  @UsePipes(new JoiValidationPipe(ShippingLabelRequestSchema))
  async generateLabel(@Body() labelRequest: ShippingLabelRequestDto) {
    return this.shippingService.generateLabel(labelRequest);
  }
} 