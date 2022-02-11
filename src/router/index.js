import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Myself from '@/components/user/Myself'
import UserInfo from '@/components/user/UserInfo'
import Security from '@/components/user/Security'
import FriendList from '@/components/address_book/FriendList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    {
      path: '/home', name: 'Home', component: Home,
      children: [
        {
          path: 'myself', name: 'Myself', component: Myself,
          children: [
            { path: 'user_info', name: 'UserInfo', component: UserInfo },
            { path: 'security', name: 'Security', component: Security },
          ]
        },
        { path: 'friend_list', name: 'FriendList', component: FriendList },
      ]
    },
  ]
})
