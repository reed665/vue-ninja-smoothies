import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index.vue'
import AddSmoothie from '@/views/AddSmoothie.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/add-smoothie',
      name: 'addSmoothie',
      component: AddSmoothie,
    },
  ]
})
