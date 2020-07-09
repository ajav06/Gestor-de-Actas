import authHeader from '../services/UserAuthenticationHeader'

/* 
 * URL BASE DE LAS PETICIONES REST
 */
const API_URL = 'https://localhost:8080/api/auth/'

/*
 *  CONFIGURACIÓN INICIAL DE LOS SERVICIOS REST
 */

var http = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        authHeader
    }
});

export default http;