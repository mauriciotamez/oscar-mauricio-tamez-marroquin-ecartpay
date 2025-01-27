interface Image {
  url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  tier: string;
  height: number;
  length: number;
  width: number;
  price: number;
  images: Image[];
}

interface ShippingQuoteResponse {
  data: Array<{
    carrier: string;
    service: string;
    cost: number;
    currency: string;
    deliveryEstimate: string;
  }>;
}

interface ShippingLabel {
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

interface ShippingInfo {
  name: string;
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

export type {
  Image,
  Product,
  ShippingQuoteResponse,
  ShippingLabel,
  ShippingInfo
};
