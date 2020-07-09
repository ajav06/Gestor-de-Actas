import authHeader from '../services/UserAuthenticationHeader'

/* 
 * URL BASE DE LAS PETICIONES REST
 */
const API_URL = 'https://gestor-actas.herokuapp.com/api/'

/* VARIBLE PARA ALMACENAR EL TOKEN DEL USUARIO ACTIVO */

let accesToken = authHeader();

/*
 *  CONFIGURACIÓN INICIAL DE LOS SERVICIOS REST
 */

var http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        Authorization: accesToken
    }
});

export default http;