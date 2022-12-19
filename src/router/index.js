import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublisherView from '@/views/PublisherView'
import ClientView from '@/views/ClientView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/publisher',
    name: 'PublisherView',
    component: PublisherView
  },
  {
    path: '/client',
    name: 'ClientView',
    component: ClientView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
