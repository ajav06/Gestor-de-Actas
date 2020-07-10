import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Decanato from '../views/Decanato'
import DecanatoForm from '../views/DecanatoForm'
import Acta from '../views/Acta'
import ActaForm from '../views/ActaForm'
import Usuario from '../views/Usuario'
import UsuarioForm from '../views/UsuarioForm'
import Reportes from '../views/Reportes'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/reportes',
    name: 'Reportes',
    component: Reportes
  },
  {
    path: '/decanatos',
    name: 'Decanato',
    component: Decanato
  },
  {
    path: '/decanatos/:id',
    name: 'Decanato.edit',
    component: DecanatoForm
  },
  {
    path: '/actas',
    name: 'Acta',
    component: Acta
  },
  {
    path: '/actas/:id',
    name: 'Acta.edit',
    component: ActaForm
  },
  {
    path: '/usuarios',
    name: 'Usuario',
    component: Usuario
  },
  {
    path: '/usuarios/:id',
    name: 'Usuario.edit',
    component: UsuarioForm
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/')
  } else {
    next();
  }
})

export default router