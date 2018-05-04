import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index.vue'
import AddSmoothie from '@/views/AddSmoothie.vue'
import EditSmoothie from '@/views/EditSmoothie.vue'

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
    {
      path: '/edit-smoothie/:slug',
      name: 'editSmoothie',
      component: EditSmoothie,
    }
  ]
})
