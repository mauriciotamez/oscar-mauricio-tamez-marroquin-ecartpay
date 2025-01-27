<template>
  <div class="admin-layout">
    <div class="admin-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
