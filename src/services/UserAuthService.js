/* 
 * URL BASE DE LAS PETICIONES REST
 */
const API_URL = 'https://gestor-actas.herokuapp.com/api/auth/'

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class AuthService {
    /* INICIA SESIÓN, PASA POR PARAMETRO LOS DATOS DEL USUARIO */
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                cedula: user.username,
                password: user.password
            })
            .then(response => {

                /* 
                *  SI NO HUBO ERRORES EN LA RESPUESTA
                *  CHEQUEA QUE EN LA RESPUESTA ESTE EL TOKEN DE VALIDACIÓN DE USUARIO
                *  SI ESTA, GUARDA TODOS LOS DATOS EN UN JSON DE MANERA LOCAL
                */

                if(response.data.accessToken){
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                /* EN CASO CONTRARIO SOLO RETORNA LA RESPUESTA */

                return response.data;
            })
            .catch(error => {

                /* 
                *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
                */

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data
                });
    
            });
    }

    /* CIERRA SESIÓN */
    logout() {
        /* ELIMINA LOS DATOS DEL USUARIO DEL JSON LOCAL */
        localStorage.removeItem('user');
    }

    /* REGISTRA UN NUEVO USUARIO, SE LE PASAN LOS DATOS DEL USUARIO POR PARAMETRO */
    register(user) {
        return axios
            .post(API_URL + 'singnup', {
                cedula: user.username,
                email: user.email,
                password: user.password
            })
            .catch(error => {

                /* 
                *  SI HAY UN ERROR LO CAPTURA Y LO MUESTRA EN UNA MODAL
                */
      
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data
                });

            });
    }
}

export default new AuthService();