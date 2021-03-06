import http from '../assets/http-common';

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class UsuarioDataService {

    /* RETORNA EL USUARIO CON ID=id  */
    get(id){
        return http
            .get('usuario/' + id);
    }

    /* CREA UN NUEVO USUARIO ADMIN */
    create(data){
        return http
            .post('usuario',{
                cedula: data.username,
                email: data.email,
                role:data.rol,
                decanato_id:data.decanato_id,
                password: data.password
            });
    }

    /* ACTUALIZA UN USUARIO EN ESPECÍFICO */
    update(data){
        return http
            .put('usuario/'+ data.id,{
                id: data.id,
                cedula: data.cedula,
                email: data.email,
                roles: data.roles,
                decanato:data.decanato,
                password: data.password,
                estatus: data.estatus
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
            .get('usuario/activos');
    }

    /* RETORNA UNA LISTA DE USUARIOS */
    listRole(){
        return http
            .get('usuario/roles');
    }
}

export default new UsuarioDataService();