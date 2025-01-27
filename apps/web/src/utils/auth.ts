export const isAuthenticated = () => {
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

export const requireAuth = (to: any, from: any, next: any) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/admin/login');
  } else {
    next();
  }
};
