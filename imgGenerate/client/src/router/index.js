import Vue from 'vue'
import Router from 'vue-router'
const Certificate = () => import('@/views/certificate')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Certificate',
      component: Certificate
    }
  ]
})
