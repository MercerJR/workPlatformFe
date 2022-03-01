import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Myself from '@/components/user/Myself'
import UserInfo from '@/components/user/UserInfo'
import Security from '@/components/user/Security'
import FriendList from '@/components/address_book/FriendList'
import GroupList from '@/components/address_book/GroupList'
import NewFriend from '@/components/address_book/NewFriend'
import BackHome from '@/components/BackHome'
import BackHomeContent from '@/components/back/BackHomeContent'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: "/home" },
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
        { path: 'group_list', name: 'GroupList', component: GroupList },
        { path: 'new_friend', name: 'NewFriend', component: NewFriend },
      ]
    },
    {
      path: '/back_home', name: 'backHome', component: BackHome,
      children: [
        { path: 'back_home_content', name: 'BackHomeContent', component: BackHomeContent }
      ]
    },
  ]
})
