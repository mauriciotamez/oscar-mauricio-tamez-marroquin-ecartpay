import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingQuoteRequestDto, ShippingLabelRequestDto } from './dto/shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

 /* @Get('carriers')
  async getAvailableCarriers(
    @Query('countryCode') countryCode: string = 'MX',
    @Query('international') international: number = 0
  ) {
    return this.shippingService.getAvailableCarriers(countryCode, international);
  }

  */

  @Post('quote')
  async getQuote(@Body() quoteRequest: ShippingQuoteRequestDto) {
    return this.shippingService.getQuote(quoteRequest);
  }

  @Post('label')
  async generateLabel(@Body() labelRequest: ShippingLabelRequestDto) {
    return this.shippingService.generateLabel(labelRequest);
  }
    
} 