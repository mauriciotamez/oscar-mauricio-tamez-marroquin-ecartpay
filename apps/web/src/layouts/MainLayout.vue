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
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>GPU World</h3>
          <p>Your trusted source for graphics cards and gaming hardware.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/products">Products</router-link>
          <router-link to="/about">About</router-link>
        </div>
        <div class="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@gpuworld.com</p>
          <p>Phone: +52 811-999-2064</p>
          <p>Address: Monterrey, NL, Mexico</p>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#" target="_blank">Facebook</a>
            <a href="#" target="_blank">Twitter</a>
            <a href="#" target="_blank">Instagram</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 GPU World. All rights reserved.</p>
      </div>
    </footer>
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
  border-radius: 14px;
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
    border-radius: 14px;
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
    border-radius: 14px;
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

.footer {
  background-color: var(--nav-bg);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 1rem 0;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 0 2rem;
}

.footer-section h3,
.footer-section h4,
.footer-section p,
.footer-section a {
  color: var(--text-color);
}

.footer-section a {
  display: block;
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer-section a:hover {
  opacity: 1;
  color: var(--hover-color);
}

.layout:not(.dark) .footer-section h3,
.layout:not(.dark) .footer-section p:first-of-type {
  color: var(--text-color);
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  color: var(--text-color);
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
