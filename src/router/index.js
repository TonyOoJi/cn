import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import API from '../api/resources'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cn/index',
      component: require('../components/home/note.vue'),
      beforeEnter: (to, from, next) => {
        let pattern = /^(\/cn)/g
        let token = sessionStorage.getItem('accessToken')
        if (pattern.test(to.path)) {
          Axios.post(API.isLogin, {access_token: token})
            .then(res => {
              /* 判断字符串'0'，代表通过验证 */
              if (res.data.code === '0') {
                next()
              } else {
                next({name: 'Login'})
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  ]
})
