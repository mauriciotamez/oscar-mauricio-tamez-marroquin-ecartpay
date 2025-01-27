<template>
  <div class="form-container">
    <h1>{{ isEdit ? 'Edit' : 'Add' }} Product</h1>

    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-grid">
        <div class="form-group">
          <label>Product Name</label>
          <input v-model="product.name" required />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="product.description" required></textarea>
        </div>

        <div class="form-group">
          <label>Brand</label>
          <select v-model="product.brand" required>
            <option value="">Select Brand</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
          </select>
        </div>

        <div class="form-group">
          <label>Tier</label>
          <select v-model="product.tier" required>
            <option value="">Select Tier</option>
            <option value="high-end">High End</option>
            <option value="mid-end">Mid End</option>
            <option value="low-end">Low End</option>
          </select>
        </div>

        <div class="dimensions">
          <div class="form-group">
            <label>Height (mm)</label>
            <input type="number" v-model="product.height" required min="0" />
          </div>

          <div class="form-group">
            <label>Length (mm)</label>
            <input type="number" v-model="product.length" required min="0" />
          </div>

          <div class="form-group">
            <label>Width (mm)</label>
            <input type="number" v-model="product.width" required min="0" />
          </div>
        </div>

        <div class="form-group">
          <label>Price (MXN)</label>
          <input type="number" v-model="product.price" required min="0" />
        </div>
      </div>

      <div v-if="isEdit" class="image-section">
        <img
          v-if="product.images?.[0]?.url"
          :src="product.images[0].url"
          alt="Product Image"
          class="product-image"
        />
      </div>

      <div class="button-group">
        <button type="submit" class="submit-button">
          {{ isEdit ? 'Update' : 'Add' }} Product
        </button>
        <button type="button" @click="router.push('/admin')" class="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => route.params.id);

interface Product {
  id?: string;
  name: string;
  description: string;
  height: number;
  length: number;
  width: number;
  brand: string;
  tier: string;
  price: number;
  images?: { url: string }[];
}

const product = ref<Product>({
  name: '',
  description: '',
  height: 0,
  length: 0,
  width: 0,
  brand: '',
  tier: '',
  price: 0
});

const fetchProduct = async () => {
  if (isEdit.value) {
    try {
      const response = await fetch(`http://localhost:3000/products/${route.params.id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      product.value = await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      router.push('/admin');
    }
  }
};

const submitForm = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const method = isEdit.value ? 'PATCH' : 'POST';
    const url = isEdit.value
      ? `http://localhost:3000/products/${route.params.id}`
      : 'http://localhost:3000/products';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: product.value.name,
        description: product.value.description,
        height: Number(product.value.height),
        length: Number(product.value.length),
        width: Number(product.value.width),
        brand: product.value.brand,
        tier: product.value.tier,
        price: Number(product.value.price)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save product');
    }
    router.push('/admin');
  } catch (error) {
    console.error('Error saving product:', error);
    if (error instanceof Error && error.message === 'No authentication token found') {
      router.push('/admin/login');
    } else {
      alert(error instanceof Error ? error.message : 'Failed to save product');
    }
  }
};

onMounted(fetchProduct);
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--nav-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-color);
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg, rgba(255, 255, 255, 0.1));
  color: var(--text-color);
}

.dimensions {
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.image-section {
  grid-column: span 2;
}

.product-image {
  max-width: 300px;
  border-radius: 8px;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.submit-button,
.cancel-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}

.submit-button:hover,
.cancel-button:hover {
  opacity: 0.9;
}
</style>
