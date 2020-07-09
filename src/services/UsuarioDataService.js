import http from '../assets/http-common';

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class UsuarioDataService {

    /* RETORNA EL USUARIO CON ID=id  */
    get(id){
        return http
            .get('usuario/' + id);
    }

    /* CREA UN NUEVO USUARIO ADMIN */
    createAdmin(data){
        return http
            .post('auth/singnup',{
                cedula: data.username,
                email: data.email,
                role:['admin'],
                decanato_id:data.decanato_id,
                password: data.password
            });
    }

    /* CREA UN NUEVO USUARIO SECRETARIO */
    createSecret(data){
        return http
            .post('auth/singnup',{
                cedula: data.username,
                email: data.email,
                decanato_id:data.decanato_id,
                password: data.password
            });
    }

    /* ACTUALIZA UN USUARIO EN ESPECÍFICO */
    update(data){
        return http
            .put('usuario/'+ data.id,{
                cedula: data.username,
                email: data.email,
                role:['admin'],
                decanato_id:data.decanato_id,
                password: data.password
            });
    }

    /* ELIMINA EL USURIO CON ID=id */
    remove(id){
        return http
            .delete('usuario/'+ id);
    }

    /* RETORNA UNA LISTA DE USUARIOS */
    list(){
        return http
            .get('usuario');
    }
}

export default new UsuarioDataService();