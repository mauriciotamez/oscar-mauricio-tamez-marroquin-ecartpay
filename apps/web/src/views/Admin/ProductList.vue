<template>
  <div class="products-list">
    <div v-for="product in products" :key="product.id" class="product-row">
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <div class="specs">
          <span>{{ product.brand }} | {{ product.tier }}</span>
          <span>${{ formatPrice(product.price) }} MXN</span>
        </div>
      </div>
      <div class="actions">
        <router-link :to="`/admin/products/edit/${product.id}`" class="edit-button">Edit</router-link>
        <button @click="deleteProduct(product.id)" class="delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  tier: string;
  price: number;
}

const products = ref<Product[]>([]);
const router = useRouter();

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    products.value = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const deleteProduct = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to delete product');
    await fetchProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--nav-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.product-info h3 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.description {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.specs {
  display: flex;
  gap: 1rem;
  color: var(--text-color);
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.edit-button, .delete-button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.edit-button {
  background-color: #2196F3;
  color: white;
  text-decoration: none;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.edit-button:hover, .delete-button:hover {
  opacity: 0.9;
}
</style>
