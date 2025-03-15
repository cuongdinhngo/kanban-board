import { createRouter, createWebHistory } from 'vue-router'
import TodoOverview from '@/components/TodoList/TodoOverview.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/todo',
      name: 'todo',
      component: TodoOverview,
    },
    {
      path: '/kanban',
      name: 'kanban',
      component: () => import('@/components/Kanban/Kanban.vue'),
    },
    {
      path: '/sprint',
      name: 'sprint',
      component: () => import('@/components/Sprint/SprintOverview.vue')
    }
  ],
})

export default router
