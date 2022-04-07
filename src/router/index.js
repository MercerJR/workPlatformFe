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
import StudioInfo from '@/components/back/StudioInfo'
import ManageAdmin from '@/components/back/ManageAdmin'
import SuperAdmin from '@/components/back/SuperAdmin'
import Admin from '@/components/back/Admin'
import OrganizationalStructure from '@/components/back/OrganizationalStructure'
import Member from '@/components/back/Member'
import Department from '@/components/back/Department'
import PeopleStructure from '@/components/address_book/PeopleStructure'
import Chat from '@/components/Chat'
import Notice from '@/components/Notice'
import Announcement from '@/components/Announcement'

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
        { path: 'people_structure', name: 'PeopleStructure', component: PeopleStructure },
        { path: 'chat', name: 'Chat', component: Chat },
        { path: 'notice', name: 'Notice', component: Notice },
        { path: 'announcement', name: 'Announcement', component: Announcement },
      ]
    },
    {
      path: '/back_home', name: 'backHome', component: BackHome, redirect: '/back_home/home_content',
      children: [
        { path: 'home_content', name: 'BackHomeContent', component: BackHomeContent },
        { path: 'studio_info', name: 'StudioInfo', component: StudioInfo },
        {
          path: 'manage_admin', name: 'ManageAdmin', component: ManageAdmin,
          children: [
            { path: 'super_admin', name: 'SuperAdmin', component: SuperAdmin },
            { path: 'admin', name: 'Admin', component: Admin },
          ]
        },
        {
          path: 'organizational_structure', name: 'OrganizationalStructure', component: OrganizationalStructure,
          children: [
            { path: 'member', name: 'Member', component: Member },
            { path: 'department', name: 'Department', component: Department },
          ]
        },
      ]
    },
  ]
})
