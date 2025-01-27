<template>
  <div class="product-container">
    <div v-if="!product" class="error-message">
      Product not found or failed to load
    </div>
    <!-- Product Details Section -->
    <div class="product-detail" v-if="product">
      <div class="product-images">
        <img
          v-if="product.images[0]?.url"
          :src="product.images[0].url"
          :alt="product.name"
          class="main-image"
        />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>
        <div class="specs">
          <div class="spec-item">
            <span class="label">Brand:</span>
            <span class="value">{{ product.brand }}</span>
          </div>
          <div class="spec-item">
            <span class="label">Tier:</span>
            <span class="value">{{ product.tier }}</span>
          </div>
          <div class="spec-item">
            <span class="label">Dimensions:</span>
            <span class="value">{{ product.height }} x {{ product.length }} x {{ product.width }} mm</span>
          </div>
        </div>
        <div class="price-tag">
          <span class="price">${{ formatPrice(product.price) }} MXN</span>
          <button class="buy-button" @click="handleBuyNowClick">
            <span class="buy-text">Buy Now</span>
            <img :src="cartIcon" alt="Cart" class="cart-icon">
          </button>
        </div>
      </div>
    </div>

    <!-- Shipping Form Section -->
    <div v-if="showShippingForm" class="shipping-section" ref="shippingFormRef">
      <div v-if="isLoading" class="loader-container">
        <OrbitSpinner />
      </div>
      <div v-else class="shipping-content">
        <h2>Shipping Information</h2>

        <div v-if="!currentShippingQuote" class="form-container">
          <form @submit.prevent="getShippingQuote" novalidate>
            <div class="form-grid">
              <div class="form-group">
                <label>Name *</label>
                <input
                  v-model="shippingInfo.name"
                  type="text"
                  required
                  :class="{ 'error': formErrors.name }"
                >
                <span v-if="formErrors.name" class="error-message">Name is required</span>
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input
                  v-model="shippingInfo.email"
                  type="email"
                  required
                  :class="{ 'error': formErrors.email }"
                >
                <span v-if="formErrors.email" class="error-message">Valid email is required</span>
              </div>
              <div class="form-group">
                <label>Phone *</label>
                <input
                  v-model="shippingInfo.phone"
                  type="tel"
                  required
                  :class="{ 'error': formErrors.phone }"
                >
                <span v-if="formErrors.phone" class="error-message">Phone number is required</span>
              </div>
              <div class="form-group">
                <label>Street *</label>
                <input
                  v-model="shippingInfo.street"
                  type="text"
                  required
                  :class="{ 'error': formErrors.street }"
                >
                <span v-if="formErrors.street" class="error-message">Street is required</span>
              </div>
              <div class="form-group">
                <label>Number *</label>
                <input
                  v-model="shippingInfo.number"
                  type="text"
                  required
                  :class="{ 'error': formErrors.number }"
                >
                <span v-if="formErrors.number" class="error-message">Number is required</span>
              </div>
              <div class="form-group">
                <label>City *</label>
                <input
                  v-model="shippingInfo.city"
                  type="text"
                  required
                  :class="{ 'error': formErrors.city }"
                >
                <span v-if="formErrors.city" class="error-message">City is required</span>
              </div>
              <div class="form-group">
                <label>State *</label>
                <input
                  v-model="shippingInfo.state"
                  type="text"
                  required
                  :class="{ 'error': formErrors.state }"
                >
                <span v-if="formErrors.state" class="error-message">State is required</span>
              </div>
              <div class="form-group">
                <label>Postal Code *</label>
                <input
                  v-model="shippingInfo.postalCode"
                  type="text"
                  required
                  :class="{ 'error': formErrors.postalCode }"
                >
                <span v-if="formErrors.postalCode" class="error-message">Postal code is required</span>
              </div>
            </div>
            <div class="button-group">
              <button class="button primary" @click="getShippingQuote">
                Get Shipping Quote
              </button>
              <button class="button secondary" @click="resetShippingForm">
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div v-else class="quote-container">
          <h3>Shipping Options</h3>
          <div class="quote-grid">
            <div class="quote-option">
              <p class="">Carrier: {{ currentShippingQuote.data[0].carrier }} - {{ currentShippingQuote.data[0].service }}</p>
              <p class="estimate">Delivery Estimate: {{ currentShippingQuote.data[0].deliveryEstimate }}</p>
              <div class="button-group">
                <button @click="generateLabel(currentShippingQuote.data[0])">Select and Generate Shipping</button>
                <button type="button" class="secondary" @click="resetShippingForm">Change Address</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Label Results -->
        <div v-if="currentShippingLabel" class="label-results">
          <h3>Shipping Label Generated</h3>
          <div class="label-details">
            <p><strong>Carrier:</strong> {{ currentShippingLabel.carrier }}</p>
            <p><strong>Service:</strong> {{ currentShippingLabel.service }}</p>
            <p><strong>Tracking Number:</strong> {{ currentShippingLabel.trackingNumber }}</p>
            <p><strong>Total Cost:</strong> ${{ formatPrice(currentShippingLabel.totalPrice) }} {{ currentShippingLabel.currency }}</p>
            <div class="button-group">
              <a :href="currentShippingLabel.label" target="_blank" class="button primary">
                Download Label
              </a>
              <a :href="currentShippingLabel.trackUrl" target="_blank" class="button secondary">
                Track Package
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import OrbitSpinner from '@/components/OrbitSpinner.vue';
import type {
  Product,
  ShippingQuoteResponse,
  ShippingLabel,
  ShippingInfo
} from '@/types/shipping';
import cartIcon from '@/assets/cart.png'

interface Image {
  url: string;
}

const route = useRoute();
const product = ref<Product | null>(null);
const showShippingForm = ref(false);
const currentShippingQuote = ref<ShippingQuoteResponse | null>(null);
const currentShippingLabel = ref<ShippingLabel | null>(null);
const isLoading = ref(false);
const shippingFormRef = ref<HTMLElement | null>(null)

const shippingInfo = reactive({
  name: '',
  email: '',
  phone: '',
  street: '',
  number: '',
  city: '',
  state: '',
  postalCode: ''
});

const formErrors = reactive({
  name: false,
  email: false,
  phone: false,
  street: false,
  number: false,
  city: false,
  state: false,
  postalCode: false
});

const fetchProduct = async (retries = 3, delay = 1000) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/products/${route.params.id}`);
    if (!response.ok) throw new Error('Product not found');
    product.value = await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchProduct(retries - 1, delay * 1.5);
    }
    product.value = null;
  }
};

onMounted(() => {
  fetchProduct();
});

const formatPrice = (price: number | undefined) => {
  if (!price) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getShippingQuote = (event: Event) => {
  event.preventDefault()

  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = false
  })

  let hasErrors = false
  Object.keys(shippingInfo).forEach(key => {
    if (!shippingInfo[key as keyof typeof shippingInfo]) {
      formErrors[key as keyof typeof formErrors] = true
      hasErrors = true
    }
  })

  if (!hasErrors && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
    formErrors.email = true
    hasErrors = true
  }

  if (hasErrors) {
    return
  }

  calculateShipping()
}

const calculateShipping = async () => {
  if (!product.value) return;
  isLoading.value = true;

  try {
    const response = await fetch('http://127.0.0.1:3000/shipping/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        destination: shippingInfo,
        packages: [{
          content: product.value.name,
          amount: 1,
          type: 'box',
          weight: 2,
          weightUnit: 'KG',
          lengthUnit: 'CM',
          dimensions: {
            length: product.value.length,
            width: product.value.width,
            height: product.value.height
          }
        }],
        shipment: {
          carrier: 'fedex',
          service: 'express',
          type: 1
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format');
    }

    currentShippingQuote.value = data;
    console.log('Shipping quote response:', data);
  } catch (error) {
    console.error('Error getting shipping quote:', error);
  } finally {
    isLoading.value = false;
  }
};

const generateLabel = async (quote: ShippingQuoteResponse['data'][0]) => {
  if (!product.value) return;
  isLoading.value = true;

  try {
    const response = await fetch('http://localhost:3000/shipping/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: {
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
        },
        destination: shippingInfo,
        packages: [{
          content: product.value.name,
          amount: 1,
          type: 'box',
          dimensions: {
            length: Math.min(20, product.value.length / 10),
            width: Math.min(20, product.value.width / 10),
            height: Math.max(5, product.value.height)
          },
          weight: 2,
          weightUnit: 'KG',
          lengthUnit: 'CM'
        }],
        shipment: {
          carrier: quote.carrier,
          service: quote.service,
          type: 1
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Label generation error:', errorData);
      throw new Error(errorData.message || 'Failed to generate label');
    }

    currentShippingLabel.value = await response.json();
    console.log('Shipping label response:', currentShippingLabel.value);
  } catch (error) {
    console.error('Error generating label:', error);
  } finally {
    isLoading.value = false;
  }
};

const resetShippingForm = () => {
  if (!currentShippingQuote.value) {
    const hasFilledFields = Object.values(shippingInfo).some(value => value !== '')

    if (!hasFilledFields) {
      showShippingForm.value = false
    }

    Object.keys(shippingInfo).forEach(key => {
      shippingInfo[key as keyof typeof shippingInfo] = ''
    })
  }

  Object.keys(formErrors).forEach(key => {
    formErrors[key as keyof typeof formErrors] = false
  })

  currentShippingQuote.value = null
  currentShippingLabel.value = null
}

const handleBuyNowClick = () => {
  showShippingForm.value = !showShippingForm.value

  setTimeout(() => {
    shippingFormRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, 100)
}
</script>

<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  background: var(--nav-bg);
  border-radius: 12px;
  width: 100%;
}

.product-images {
  width: 100%;
}

.main-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.description {
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.specs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.spec-item {
  display: flex;
  gap: 1rem;
}

.label {
  font-weight: bold;
  color: var(--text-color);
  min-width: 100px;
}

.value {
  color: var(--text-color);
}

.price-tag {
  position: relative;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
}

.buy-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 200px;
}

.buy-text {
  flex: 1;
  text-align: center;
}

.cart-icon {
  width: 20px;
  height: 20px;
  filter: invert(1) brightness(100);
  position: absolute;
  right: 2rem;
}

.buy-button:hover {
  background-color: #45a049;
}

.shipping-section {
  position: relative;
  background-color: var(--nav-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  width: 100%;
}

.shipping-content {
  color: var(--text-color);
}

.shipping-content h2 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--input-bg, rgba(255, 255, 255, 0.1));
  border: 1px solid #ddd;
  border-radius: 8px;
  color: var(--text-color);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 1px #4CAF50;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  align-items: stretch;
}

.quote-container {
  margin-top: 1rem;
}

.quote-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.quote-option {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
}

.quote-option p {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.quote-option button {
  width: 100%;
  margin-top: 0;
  margin-left: 0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quote-option button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  background-color: #45a049;
}

.carrier {
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.cost {
  color: #4CAF50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.label-results {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--card-bg);
}

.label-details {
  margin-top: 1rem;
  color: var(--text-color);
}

.label-details p {
  margin-bottom: 0.5rem;
}

/* Base button styles */
.button,
.quote-option button,
.shipping-section .button-group .button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  height: 45px;
}

.button.secondary,
.quote-option button.secondary,
.shipping-section .button-group .button.secondary {
  border: 1px solid var(--border-color);
}

.button:hover,
.quote-option button:hover,
.shipping-section .button-group .button:hover,
.button.secondary:hover,
.quote-option button.secondary:hover,
.shipping-section .button-group .button.secondary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  align-items: stretch;
}

.button-group .button,
.shipping-section .button-group .button {
  flex: 1;
  min-width: 0;
}

.label-results .button-group .button {
  min-width: 150px;
  flex: 0 1 auto;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.form-group input.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 1px #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>
