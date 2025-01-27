<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
      class="page-button"
    >
      Previous
    </button>

    <span class="page-info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
      class="page-button"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: 'page-change', page: number): void;
}>();
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: var(--nav-bg);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-color);
}
</style>
