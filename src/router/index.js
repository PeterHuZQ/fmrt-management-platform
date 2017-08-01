import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/common/Layout'
import Welcome from '@/components/page/Welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/Welcome',
      children: [
        {
          path: 'Welcome',
          component: Welcome
        }
      ]
    }
  ]
})
