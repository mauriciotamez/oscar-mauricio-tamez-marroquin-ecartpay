<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useTheme } from '@/stores/theme'
import { computed, onMounted, watch, ref } from 'vue'
import { CoSun } from "oh-vue-icons/icons";

// Import your PNG images
import sunIcon from '@/assets/sun.png'
import moonIcon from '@/assets/moon.png'
import graphicsCard from '@/assets/graphic-card.png'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const authState = ref(localStorage.getItem('isAdminAuthenticated') === 'true')
const isAuthenticated = computed(() => authState.value)

const handleLogout = () => {
  localStorage.removeItem('isAdminAuthenticated')
  authState.value = false
  router.push('/')
}

watch(isAuthenticated, (newValue) => {
  if (!newValue && router.currentRoute.value.path.startsWith('/admin')) {
    router.push('/')
  }
})

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <div class="layout" :class="{ 'dark': isDark }">
    <div class="content-wrapper">
      <nav class="navbar">
        <div class="nav-brand">
          <RouterLink to="/" class="brand-link">
            <span class="brand-text">GPU World</span>
            <img :src="graphicsCard" alt="GPU" class="brand-icon">
          </RouterLink>
        </div>
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <template v-if="isAuthenticated">
            <RouterLink to="/admin" class="admin-link">Admin Dashboard</RouterLink>
            <button @click="handleLogout" class="logout-button">Logout</button>
          </template>
          <button @click="toggleTheme" class="theme-toggle">
            <img
              :src="isDark ? moonIcon : sunIcon"
              :alt="isDark ? 'Dark mode' : 'Light mode'"
              class="theme-icon"
              :class="{ 'invert': isDark }"
            >
          </button>
        </div>
      </nav>

      <main class="main-content">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  min-width: 100vw;
  --text-color: #171717;
  --hover-color: #45a049;
  --nav-bg: rgba(255, 255, 255, 0.3);
}

.layout.dark {
  --text-color: #ffffff;
  --hover-color: #45a049;
  --nav-bg: rgba(0, 0, 0, 0.3);
}

.content-wrapper {
  padding: 0 2rem;
  margin: 0 auto;
}

.navbar {
  background-color: var(--nav-bg);
  padding: 0.65rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 90px;
  margin: 16px 0;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-brand a {
  color: var(--text-color);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--hover-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: var(--hover-color);
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a.router-link-active {
  color: var(--hover-color);
}

.nav-links a.router-link-active::after {
  width: 100%;
  background-color: var(--hover-color);
}

.main-content {
  padding: 0;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: filter 0.3s;
}

.theme-icon.invert {
  filter: invert(1);
}

.theme-toggle:hover {
  opacity: 0.8;
}

.admin-link {
  background-color: #2196F3;
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
}

.logout-button {
  background-color: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.admin-link:hover, .logout-button:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
    border-radius: 45px;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .nav-links a {
    padding: 0.35rem 0.75rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    justify-content: space-between;
    border-radius: 24px;
  }

  .nav-links {
    width: auto;
    justify-content: flex-end;
    margin-top: 0;
  }

  .brand-text {
    display: none;
  }

  .brand-link {
    gap: 0;
  }

  .nav-links a {
    padding: 0.35rem 0.5rem;
    font-size: 0.85rem;
  }

  .admin-link {
    padding: 0.35rem 0.5rem;
  }

  .logout-button {
    padding: 0.35rem 0.5rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>
