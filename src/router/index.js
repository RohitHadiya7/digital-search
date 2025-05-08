import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../pages/Home.vue'
// import About from '../pages/About.vue'
// import NotFound from '../pages/other/pageNotFound.vue'
import DefaultLayout from '@/components/HelloWorld.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Project from '@/views/projects/Project.vue'
import Login from '@/views/Auth/Login.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Dashboard },
    ],
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/project',
    component: Project
  }
  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
