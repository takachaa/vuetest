import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Nav from '../views/Nav.vue'
import Board from '../views/Board'
import DirectJob from '../views/DirectJob'
import Photo from '../views/Photo'
import Scroll from '../views/Scroll'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next('board');
      }else{
        next()
      } 
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next('board');
      }else{
        next()
      } 
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  },
  {
    path: '/nav',
    name: 'Nav',
    component: Nav,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  },
  {
    path: '/directjob',
    name: 'DirectJob',
    component: DirectJob,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: Scroll,
    beforeEnter(to, from , next){
      if(store.getters.idToken){
        next();
      }else{
        next('/')
      }
      
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
