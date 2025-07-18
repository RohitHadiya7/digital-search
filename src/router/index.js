import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/components/pageNotFound.vue'
import DefaultLayout from '@/components/HelloWorld.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Project from '@/views/projects/Project.vue'
import Login from '@/views/Auth/Login.vue'
import SignUp from '@/views/Auth/SignUp/SignUp.vue'
import Gallery from '@/views/Gallery/Gallery.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/dashboard', name: 'Home', component: Dashboard },
      { path: '/project', name: 'Project', component: Project },
      { path: '/gallery', name: 'Gallery', component: Gallery },
    ],
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: SignUp
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
