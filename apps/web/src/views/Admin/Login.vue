<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="login-title">Admin Login</h1>

      <div class="form-group">
        <label>Username</label>
        <input
          v-model="username"
          type="text"
          required
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="login-button">Login</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (!response.ok) {
      error.value = 'Invalid credentials';
      return;
    }

    const data = await response.json();
    localStorage.setItem('isAdminAuthenticated', 'true');
    localStorage.setItem('adminToken', data.token);
    router.push('/admin');
  } catch (error) {
    console.error('Login error:', error);
    error.value = 'Login failed';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: var(--nav-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: -5rem;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-bg, rgba(255, 255, 255, 0.1));
  color: var(--text-color);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.login-button:hover {
  opacity: 0.9;
}

.error-message {
  color: #f44336;
  margin-top: 1rem;
  text-align: center;
}
</style>
