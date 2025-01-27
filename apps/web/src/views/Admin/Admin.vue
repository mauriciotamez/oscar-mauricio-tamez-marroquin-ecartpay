<template>
  <div class="admin-container">
    <div class="header">
      <div class="header-left">
        <h1>Product Management</h1>
        <router-link to="/" class="view-store-button">View Store</router-link>
      </div>
      <router-link to="/admin/products/add" class="add-button">Add New Product</router-link>
    </div>

    <RouterView />
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
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete product');
    await fetchProducts();
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};

onMounted(() => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    router.push('/admin/login');
  }
});

onMounted(fetchProducts);
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-store-button {
  background-color: #2196F3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.view-store-button:hover {
  opacity: 0.9;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.add-button:hover {
  opacity: 0.9;
}

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
