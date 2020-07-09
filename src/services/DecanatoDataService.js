import http from '../assets/http-common';

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class DecanatoDataService {

    /* RETORNA EL DECANATO CON CÓDIGO=id  */
    get(id){
        return http
            .get('decanato/' + id);
    }

    /* CREA UN NUEVO DECANATO */
    create(data){
        return http
            .post('decanato',{
                nombre: data.nombre,
                siglas: data.siglas,
                estatus: data.estatus
            });
    }

    /* ACTUALIZA UN DECANATO EN ESPECÍFICO */
    update(data){
        return http
            .put('decanato/'+ data.codigo,{
                nombre: data.nombre,
                siglas: data.siglas,
                estatus: data.estatus
            });
    }

    /* ELIMINA EL DECANATO CON CÓDIGO=id */
    remove(id){
        return http
            .delete('decanato/'+ id);
    }

    /* RETORNA UNA LISTA DE DECANATOS ACTIVOS */
    list(){
        return http
            .get('decanato');
    }
}

export default new DecanatoDataService();