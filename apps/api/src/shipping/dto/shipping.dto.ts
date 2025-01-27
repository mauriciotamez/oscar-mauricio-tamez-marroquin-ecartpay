// Base address structure
export class AddressDto {
  name: string;
  company?: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  district?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference?: string;
  coordinates?: {
    latitude: string;
    longitude: string;
  };
}

// Package dimensions
export class DimensionsDto {
  length: number;
  width: number;
  height: number;
}

// Package information
export class PackageDto {
  content: string;
  boxCode?: string;
  amount: number;
  type: 'box' | 'envelope' | 'pallet';
  weight: number;
  insurance: number;
  declaredValue: number;
  weightUnit: 'KG' | 'LB';
  lengthUnit: 'CM' | 'IN';
  dimensions: DimensionsDto;
}

// Shipping settings
export class ShippingSettingsDto {
  printFormat: 'PDF' | 'PNG' | 'ZPLII';
  printSize: 'PAPER_7X4.75' | 'STOCK_4X6';
  currency: string;
  cashOnDelivery?: string;
  comments?: string;
}

// Main quote request
export class ShippingQuoteRequestDto {
  origin: AddressDto;
  destination: AddressDto;
  packages: PackageDto[];
  shipment: {
    carrier: string;
    service: string;
    type: number;
  };
  settings: ShippingSettingsDto;
  additionalServices?: any[];
}

// Response DTOs
export class ShippingQuoteResponseDto {
  data: {
    carrier: string;
    service: string;
    cost: number;
    currency: string;
    deliveryEstimate: string;
  }[];
}

export class ShippingLabelRequestDto extends ShippingQuoteRequestDto {
  quoteId?: string;
}

export class ShippingLabelResponseDto {
  carrier: string;
  service: string;
  shipmentId: number;
  trackingNumber: string;
  trackUrl: string;
  label: string;
  additionalFiles?: string[];
  totalPrice: number;
  currency: string;
} 