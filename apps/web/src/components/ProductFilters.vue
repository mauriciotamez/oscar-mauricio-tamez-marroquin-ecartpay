<template>
  <aside class="filters" :class="{ 'filters-collapsed': !isExpanded }">
    <button class="toggle-filters" @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'Hide Filters' : 'Show Filters' }}
      <span class="arrow" :class="{ 'arrow-up': isExpanded }">▼</span>
    </button>

    <div class="filters-content" v-show="isExpanded">
      <div class="filter-group">
        <h3>Brand</h3>
        <div class="filter-options">
          <label>
            <input
              type="checkbox"
              v-model="selectedBrands"
              value="NVIDIA"
              @change="updateFilters"
            > NVIDIA
          </label>
          <label>
            <input
              type="checkbox"
              v-model="selectedBrands"
              value="AMD"
              @change="updateFilters"
            > AMD
          </label>
        </div>
      </div>

      <div class="filter-group">
        <h3>Tier</h3>
        <div class="filter-options">
          <label>
            <input
              type="checkbox"
              v-model="selectedTiers"
              value="high-end"
              @change="updateFilters"
            > High-end
          </label>
          <label>
            <input
              type="checkbox"
              v-model="selectedTiers"
              value="mid-end"
              @change="updateFilters"
            > Mid-end
          </label>
          <label>
            <input
              type="checkbox"
              v-model="selectedTiers"
              value="low-end"
              @change="updateFilters"
            > Low-end
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['filter']);
const selectedBrands = ref<string[]>([]);
const selectedTiers = ref<string[]>([]);
const isExpanded = ref(false);

const updateFilters = () => {
  emit('filter', {
    brands: selectedBrands.value,
    tiers: selectedTiers.value
  });
};
</script>

<style scoped>
.filters {
  background: var(--nav-bg);
  border-radius: 12px;
  position: relative;
}

.filters-collapsed {
  background: none;
  padding: 0;
  box-shadow: none;
}

.toggle-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--nav-bg);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9rem;
}

.filters-content {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group h3 {
  color: black;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: black;
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}
</style>
