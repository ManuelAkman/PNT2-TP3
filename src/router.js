import { createRouter, createWebHistory } from 'vue-router'
import FormView from './vistas/FormView.vue'
import UsersView from './vistas/UsersView.vue'

const routes = [
  { 
    path: '/', 
    name: 'Form', 
    component: FormView 
  },
  { 
    path: '/usuarios', 
    name: 'Usuarios', 
    component: UsersView 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
