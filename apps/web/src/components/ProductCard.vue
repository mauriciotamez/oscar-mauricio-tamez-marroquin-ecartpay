<template>
  <router-link :to="`/products/${product.id}`" class="product-link">
    <div class="product-card">
      <img v-if="product.images[0]?.url" :src="product.images[0].url" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-details">
          <p class="dimensions">{{ product.height }} x {{ product.length }} x {{ product.width }} mm</p>
          <p class="brand-tier">{{ product.brand }} | {{ product.tier }}</p>
          <p class="price"><span class="price-value">${{ formatPrice(product.price) }} MXN</span></p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<style scoped>
.product-link {
  text-decoration: none;
  color: inherit !important;
  display: block;
  height: 550px;
}

.product-card {
  background: var(--nav-bg);
  border-radius: 12px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, outline 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: 2px solid transparent;
  outline-offset: -2px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  outline-color: var(--text-color);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.product-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color) !important;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  color: var(--text-color) !important;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-shrink: 0;
  height: 80px;
}

.product-details {
  margin-top: auto;
}

.dimensions {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  color: var(--text-color) !important;
}

.brand-tier {
  font-size: 0.875rem;
  opacity: 0.9;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-color) !important;
}

.price {
  margin-top: 0.5rem;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4CAF50 !important;
  background: transparent;
  padding: 2px 4px;
  border-radius: 4px;
}

.product-link:hover {
  color: inherit !important;
}
</style>
