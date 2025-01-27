<script setup lang="ts">
import ImageSlider from '@/components/ImageSlider.vue'
</script>

<template>
  <div class="home">
    <ImageSlider />

    <section class="content">
      <h1>Welcome to the GPU World</h1>
      <p>Discover our wide range of high-performance graphics cards</p>
      <RouterLink to="/products" class="cta-button">
        Browse Graphic Cards
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home {
  margin-top: 0;
}

.content {
  text-align: center;
  padding: 4rem 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

p {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #45a049;
}
</style>
