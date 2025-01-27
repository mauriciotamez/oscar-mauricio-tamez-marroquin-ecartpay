import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/Home.vue';
import ProductListPage from '@/views/ProductListPage.vue';
import { requireAuth } from '../utils/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/products',
    name: 'product-list',
    component: ProductListPage,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/Admin/Login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/Admin.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../views/Admin/ProductList.vue'),
      },
      {
        path: 'products/add',
        component: () => import('../views/Admin/AddEditProduct.vue'),
      },
      {
        path: 'products/edit/:id',
        component: () => import('../views/Admin/AddEditProduct.vue'),
      }
    ]
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(requireAuth);

export default router;
