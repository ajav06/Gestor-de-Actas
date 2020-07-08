import Vue from 'vue'
import Vuex from 'vuex'

import UserDataService from '../services/UserDataService'
import TableDataService from '../services/TableDateService'

Vue.use(Vuex)

const Usuario = {
  state: {
    username: 'usuario'
  },
  mutations: {
    
  },
  actions: {
    loginAction(context, keys) {

      UserDataService
        .login(keys)
        .then(response => {

          Cookies.set('csrftoken',response.data['auth_token'], {expires: 0.5});

          Swal.fire({
            icon: 'success',
            title: 'Sesión iniciada con éxito.'
          }).then(result => {

            location.href = '#/buscar';

            window.location.reload(false);

          });

        })
        .catch(error => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data['non_field_errors']
          });

        });
    },

    registerAction(context, keys) {
      
      UserDataService
        .register(keys)
        .then(response => {

          Swal.fire({
              icon: 'success',
              title: 'Usuario registrado con éxito.',

          }).then(result => {
              location.href = '#/'
          })

      })
      .catch(error => {

          if (error.response.data['password'])
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.response.data['password']
              });

          else if (error.response.data['username'])
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.response.data['username']
              });
      });

    },

    logoutAction(context) {

      UserDataService.
        logout()
        .then(response => {

          Cookies.remove('csrftoken');

          context.commit('logout', null);

          Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada con éxito.',

          }).then(result => {
            location.href = '#/'
          });

        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data
          });
        });

    },
    
  },
  getters: {}
};

const Table = {
  state: {
    codigo: null,
    blackCard: null,
    whiteCards: [],
    is_init: false
  },
  mutations: {
    setCodigo(state, codigo) {
      state.codigo = codigo;
    },
    setBlackCard(state, card) {
      state.blackCard = card;
    },
    setWhiteCards(state, cards) {
      state.whiteCards = [];
      for (const card in cards){
        state.whiteCards = [{
          name: cards[card].name.toUpperCase(),
          card: cards[card].current_card
        },...state.whiteCards];
      }
    },
    initGame(state, value){
      state.is_init = value;
    },
    exitGame(state, value){
      state.codigo = null;
      state.blackCard = null;
      state.whiteCards = [];
      state.is_init= false;
    }
  },
  actions: {
    createTableAction(context) {

      TableDataService
        .create()
        .then(response => {

          context.commit('setCodigo', response.data['id']);

          context.commit('setBlackCard', response.data['black_card']);

          context.commit('initGame', response.data['is_active']);

          Swal.fire({
            icon: 'success',
            title: 'Mesa creada con éxito',
            text: 'Código: '+response.data['id']

          }).then(result => {
            location.href = '#/mesa/'
          });

        })
        .catch(error => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data['error']
          });

        });

    },

    joinTableAction(context, id){
      TableDataService
        .update(id)
        .then(response =>{

          context.commit('setCodigo', response.data['id']);

          context.commit('setBlackCard', response.data['black_card']);

          context.commit('setWhiteCards', response.data['players']);

          context.commit('initGame', response.data['is_active']);

          Swal.fire({
            icon: 'success',
            title: 'Se ha unido con éxito',
          }).then(result => {
            location.href = '#/mesa/'
          });

        })
        .catch(error => {
          console.log(error.response.data);
          let er = '';
          if (error.response.data['error']){
            er=(', '+error.response.data['error']).toLowerCase();
          }            

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puede unir' + er
          });

        });
    },

    searchTableAction({dispatch, context}, id) {
      TableDataService
        .get(id)
        .then(response => {

          Swal.fire({

            icon: 'info',
            title: 'Mesa encontrada',
            text: '¿Desea unirse?',
            showCancelButton:true,
            cancelButtonColor:'#d33',
            confirmButtonColor:'#48c774',
            cancelButtonText:'No',
            confirmButtonText:'Sí',
          }).then(result => {
            if (result.value){
              dispatch('joinTableAction', id);
            }
          });

        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Código erroneo tabla no existente'
          });

        });
    },

    setBlackCardAction(context, id) {
      TableDataService
        .setBlack(id)
        .then(response => {
          context.commit('setBlackCard', response.data['black_card']);
        })
        .catch(error => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data
          });

        });
    },

    setWhiteCardsAction(context, id) {
      TableDataService
        .get(id)
        .then(response => {
          context.commit('setWhiteCards', response.data['players']);
          context.commit('setBlackCard', response.data['black_card']);
        })
        .catch(error => console.log(error.response.statusText));
    },

    initGameAction(context, id) {
      TableDataService
        .init(id)
        .then(response => {

          context.commit('initGame', response.data['is_active']);

          context.commit('setBlackCard', response.data['black_card']);

          context.commit('setWhiteCards', response.data['players']);

          Swal.fire({
            icon: 'success',
            title: 'Juego iniciado con éxito.',
          });

        })
    },

    setWCardsAction(context, id) {
      TableDataService
        .setCads(id)
        .then(response => {

          context.commit('setWhiteCards', response.data['players']);

          Swal.fire({
            icon: 'success',
            title: 'Cartas repartidas con éxito.',
          });

        })
    },

    setTableAction(context) {
      UserDataService
        .table()
        .then(response =>{

          context.commit('setCodigo', response.data['id']);

          context.commit('setBlackCard', response.data['black_card']);

          context.commit('setWhiteCards', response.data['players']);

          context.commit('initGame', response.data['is_active']);

        })
        .catch(error => console.log(error.response.data['error']));
    },

    setExitAction(context) {
      UserDataService
        .exitTable()
        .then(response =>{

          context.commit('exitGame', null);

          Swal.fire({
            icon: 'success',
            title: 'Se ha salido con éxito.',
          });
        })
        .catch(error => console.log(error.response.data['error']));
    }

  },
  getters: {
    cartaNegra(state) {
      return state.blackCard;
    },
    cartasBlancas(state) {
      return state.whiteCards;
    }

  }
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    usuario: Usuario,
  }
})