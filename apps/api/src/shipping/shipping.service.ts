import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ShippingQuoteRequestDto, ShippingLabelRequestDto, ShippingLabelResponseDto, ShippingQuoteResponseDto, AddressDto } from './dto/shipping.dto';


@Injectable()
export class ShippingService {
  private readonly API_URL = 'https://api-test.envia.com';
  private readonly API_TOKEN = process.env.ENVIA_API_TOKEN;

  private readonly defaultOrigin = {
    name: "GPU World",
    company: "GPU World",
    email: "contact@gpuworld.com",
    phone: "8119992064",
    street: "Warehouse Street",
    number: "123",
    district: "other",
    city: "Monterrey",
    state: "NL",
    country: "MX",
    postalCode: "64000",
    reference: "",
    coordinates: {
      latitude: "25.6866",
      longitude: "-100.3161"
    }
  };

  async getQuote(data: ShippingQuoteRequestDto): Promise<ShippingQuoteResponseDto> {
    try {
      // Calculate package weight based on dimensions
      const volumeWeight = data.packages.map(pkg => {
        const volume = (pkg.dimensions.length * pkg.dimensions.width * pkg.dimensions.height) / 5000; // volumetric weight formula
        return Math.min(volume, 65); 
      });

      const quoteData = {
        origin: this.defaultOrigin,
        destination: data.destination,
        packages: data.packages.map((pkg) => ({
          ...pkg,
          weight: 0.02,
          insurance: 0,
          declaredValue: 0,
          weightUnit: "LB"
        })),
        shipment: data.shipment,
        settings: {
          currency: "MXN",
          printFormat: "PDF",
          printSize: "STOCK_4X6"
        }
      };

      console.log('Sending quote request to Envia:', JSON.stringify(quoteData, null, 2));

      const response = await fetch(`${this.API_URL}/ship/rate/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteData)
      });

      const responseData = await response.json();
      console.log('Envia API response:', JSON.stringify(responseData, null, 2));

      if (responseData.meta === 'error') {
        throw new Error(`Shipping quote failed: ${responseData.error.message}`);
      }

      if (!response.ok) {
        throw new Error(`Shipping quote failed: ${response.statusText}`);
      }

      return responseData;

    } catch (error) {
      console.error('Shipping quote error:', error);
      return {
        data: [{
          carrier: "DHL",
          service: "EXPRESS",
          cost: 350.50, 
          currency: "MXN",
          deliveryEstimate: "2-3 business days"
        }]
      };
    }
  }

  async generateLabel(data: ShippingLabelRequestDto): Promise<ShippingLabelResponseDto> {
    try {
      // Ensure we follow the exact API requirements
      const labelData = {
        origin: {
          ...this.defaultOrigin,
          state: this.defaultOrigin.state.substring(0, 2).toUpperCase(),
          country: "MX",
          company: "GPU World"
        },
        destination: {
          ...data.destination,
          state: data.destination.state.substring(0, 2).toUpperCase(),
          country: "MX",
          company: data.destination.company || "N/A"
        },
        packages: [{
          content: data.packages[0].content,
          amount: data.packages[0].amount,
          type: "box",
          dimensions: {
            length: data.packages[0].dimensions.length,
            width: data.packages[0].dimensions.width,
            height: data.packages[0].dimensions.height
          },
          weight: data.packages[0].weight,
          insurance: 400,
          declaredValue: 400,
          weightUnit: "KG",
          lengthUnit: "CM"
        }],
        shipment: {
          carrier: "fedex",
          service: "express",
          type: 1
        },
        settings: {
          printFormat: "PDF",
          printSize: "STOCK_4X6",
          comments: "Order from GPU World"
        }
      };

      console.log('Sending label request to Envia:', JSON.stringify(labelData, null, 2));

      const response = await fetch(`${this.API_URL}/ship/generate/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(labelData)
      });

      const responseData = await response.json();
      console.log('Envia API label response:', JSON.stringify(responseData, null, 2));

      if (responseData.meta === 'error') {
        throw new Error(`Label generation failed: ${responseData.error.message}`);
      }

      if (!response.ok) {
        throw new Error(`Label generation failed: ${response.statusText}`);
      }

      // Update the response structure to match the API
      return {
        carrier: responseData.data[0].carrier,
        service: responseData.data[0].service,
        trackingNumber: responseData.data[0].trackingNumber,
        trackUrl: responseData.data[0].trackUrl,
        label: responseData.data[0].label,
        shipmentId: responseData.data[0].shipmentId,
        totalPrice: responseData.data[0].totalPrice,
        currency: responseData.data[0].currency,
        additionalFiles: responseData.data[0].additionalFiles
      };

    } catch (error) {
      console.error('Label generation error:', error);
      throw new Error(`Failed to generate shipping label: ${error.message}`);
    }
  }
} 