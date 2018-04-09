import Vue from 'vue'
import Router from 'vue-router'
// import Axios from 'axios'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cn/index',
      component: require('../components/home/note.vue')
      // beforeEnter: (to, from, next) => {
      //   let pattern = /^(\/p)/g
      //   let token = sessionStorage.getItem('accessToken')
      //   if (pattern.test(to.path)) {
      //     Axios.post('http://localhost:8080/user/isLogin', {access_token: token})
      //       .then(res => {
      //         if (res.data.code === 0) {
      //           next()
      //         } else {
      //           next({name: 'Login'})
      //         }
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }
      // }
    }
  ]
})
