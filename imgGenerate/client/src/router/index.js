import Vue from 'vue'
import Router from 'vue-router'
const List = () => import('@/views/list')
const Certificate = () => import('@/views/certificate')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/certificate',
      name: 'Certificate',
      component: Certificate
    }
  ]
})
