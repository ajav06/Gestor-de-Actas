import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Decanato from '../views/Decanato'
import Acta from '../views/Acta'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Login', component: Home },
  { path: '/decanatos', name: 'Decanato', component: Decanato },
  { path: '/actas', name: 'Acta', component: Acta },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn){
    next('/')
  } else {
    next();
  }
})

export default router
