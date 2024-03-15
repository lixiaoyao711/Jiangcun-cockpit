import { createRouter, createWebHashHistory } from 'vue-router';
import home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: { tabName: '屏保' },
    children: [],
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index'),
    meta: { tabName: '数字门户' },
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
