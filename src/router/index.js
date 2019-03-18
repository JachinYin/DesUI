import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Template from '../components/module/Template'
import CashRecord from '../components/module/CashRecord'
import MyInfo from '../components/module/MyInfo'
import Login from '../components/openhtml/Login'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/template',
          name: 'Template',
          component: Template,
        },
        {
          path: '/cashRecord',
          name: 'CashRec',
          component: CashRecord,
        },
        {
          path: '/myInfo',
          name: 'MyInfo',
          component: MyInfo,
        },
        {
          path: '/login',
          name: 'Login',
          meta:{
            requireAuth: true
          },
          component: Login
        }
      ]
    },
    {
      path: '/logout',
      name: 'Logout',
      meta:{
        requireAuth: true
      },
      component: Home
    }
  ]
})
