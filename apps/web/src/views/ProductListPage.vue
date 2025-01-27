<template>
  <div class="product-page">
    <div class="header">
      <h1>All GPU's</h1>
      <ProductFilters @filter="handleFilters" />
    </div>
    <div class="product-content">
      <div v-if="loading" class="loading">
        Loading products...
      </div>
      <div v-else-if="error" class="error">
        Failed to load products.
        <button @click="fetchProducts(3)" class="retry-button">
          Retry
        </button>
      </div>
      <div v-else>
        <div class="products-grid">
          <div v-for="product in paginatedProducts" :key="product.id" class="grid-item">
            <ProductCard :product="product" />
          </div>
        </div>

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductFilters from '../components/ProductFilters.vue';
import Pagination from '../components/Pagination.vue';
import type { Product } from '@/types/shipping';

interface Filters {
  brands: string[];
  tiers: string[];
}

const products = ref<Product[]>([]);
const activeFilters = ref<Filters>({
  brands: [],
  tiers: []
});
const error = ref<Error | null>(null);
const loading = ref(true);

const itemsPerPage = 8;
const currentPage = ref(1);
const totalProducts = ref(0);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const brandMatch = activeFilters.value.brands.length === 0 ||
      activeFilters.value.brands.includes(product.brand);
    const tierMatch = activeFilters.value.tiers.length === 0 ||
      activeFilters.value.tiers.includes(product.tier);
    return brandMatch && tierMatch;
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const handleFilters = (filters: Filters) => {
  activeFilters.value = filters;
};

const fetchProducts = async (retries = 3, delay = 1000) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    products.value = await response.json();
    error.value = null;
    loading.value = false;
  } catch (err) {
    console.error('Error fetching products:', err);
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchProducts(retries - 1, delay * 1.5);
    }
    error.value = err instanceof Error ? err : new Error('An unknown error occurred');
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.product-page {
  position: relative;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.header h1 {
  margin-bottom: 0;
  color: var(--text-color);
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.product-content {
  width: 100%;
}

.products-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 1rem;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;

    margin: 1rem auto;
    padding: 0.5rem;
    gap: 1rem;
  }
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  opacity: 0.9;
}
</style>
