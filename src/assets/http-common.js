import * as axios from "./axios.min";

/* 
 * URL BASE DE LAS PETICIONES REST
 */
const url = 'https://ahbackend.herokuapp.com/api/';

/*
 *  CONFIGURACIÓN INICIAL DE LOS SERVICIOS REST
 */

var http = axios.create({
    baseURL: url,
    headers: {
        'Content-type': 'application/json'
    }
});

export default http;