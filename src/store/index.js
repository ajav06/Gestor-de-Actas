import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../services/UserAuthenticationService'

/* GUARDA LOS DATOS DEL JSON LOCAL EN UNA VARIABLE */
const user = JSON.parse(localStorage.getItem('user'));

/* GUARDA EL ESTADO ACTUAL DEL USUARIO EN UNA VARIABLE */
const initialState = user
  ? { status: { loggedIn: true }, user } 
  : { status: { loggedIn: false }, user: null };
/* SI LA VARIBALE USUARIO NO ES VACIA, ESTA ACTVO
*  SI ESTA VACIO NO HAY USUARIO ACTIVO
*/

/* VARIABLE GLOBAL QUE TENDRA LOS DATOS DEL USUARIO ACTIVO ACTUAL */
const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    /* ACCIONES DE AUTENTIFICACION */

    /* LOGIN: INICIAR SESIÓN */
    login({ commit }, user){
      /* DE LA CLASE 'AuthService' LLAMA LA FUNCIÓN DE LOGIN */
      return AuthService
        .login(user)
        .then(user => {

          /* SI INICIO CON ÉXITO, MUTA EL ESTADO DEL USUARIO A ACTIVO */
          commit('loginSuccess', user);
          return Promise.resolve(user);

        }, error => {

          /* return Promise.reject(error); */

          /* SINO, ENVIA UN ERROR */
          commit('loginFailure');

          /* 
          *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
          */

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          });

        })
    },

    /* CERRAR SESIÓN */
    logout({ commit }){
      /* DE LA CLASE 'AuthService' LLAMA LA FUNCIÓN DE LOGOUT */
      AuthService.logout();
      /* MUTA EL ESTADO DEL USUARIO A INACTIVO */
      commit('logout');
    },

    /* REGISTRAR USUARIO */
    register({ commit }, user){
      return AuthService
        .register(user)
        .then(response => {

          /* return Promise.resolve(response.data); */

          /* 
          *  SI NO HUBO ERRORES EN LA RESPUESTA
          *  MUESTRA UNA MODAL QUE EL USUARIO SE HA REGISTRADO CON ÉXITO
          */

          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con éxito.',
          });

        }, error => {

          /* return Promise.reject(error); */

          /* 
          *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
          */

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error
          });

        })
    }
  },

  mutations: {
    loginSuccess(state, user){
      state.status.loggedIn = true;
      state.user = user;
    },

    loginFailure(state){
      state.status.loggedIn = false;
      state.user = null;
    },

    logout(state){
      state.status.loggedIn = false;
      state.user = null;
    }
  }
}


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  }
})