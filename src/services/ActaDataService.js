import http from '../assets/http-common';

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class ActaDataService {

    /* RETORNA EL ACTA CON CÓDIGO=id  */
    get(id){
        return http
            .get('acta/' + id);
    }

    /* CREA UN NUEVO ACTA */
    create(data){
        return http
            .post('acta/',{
                tipo_sesion: data.tipo_sesion,
                pdf: data.pdf,
                resumen: data.resumen,
                fecha_sesion: data.fecha_sesion,
                decanato: data.decanato,
                estatus: data.estatus
            });
    }

    /* ACTUALIZA UN ACTA EN ESPECÍFICO */
    update(data){
        return http
            .put('acta/'+ data.codigo,{
                tipo_sesion: data.tipo_sesion,
                pdf: data.pdf,
                resumen: data.resumen,
                fecha_sesion: data.fecha_sesion,
                decanato: data.decanato,
                estatus: data.estatus
            });
    }

    /* ELIMINA EL ACTA CON CÓDIGO=id */
    remove(id){
        return http
            .delete('acta/'+ id);
    }
    
    /* SUBE EL PDF DEL ACTA */
    uploadPDF(data){
        return http
            .post('pdf/subirPDF',{
                file: data
            });
    }

    /* RETORNA EL PDF DEL ACTA CON CÓDIGO=id */
    getPDF(id){
        return http
            .get('pdf/descargarPDF/' + id);
    }

    /* RETORNA UNA LISTA DE TODAS LAS ACTAS */
    list(){
        return http
            .get('acta/');
    }

    /* RETORNA UNA LISTA DE ACTAS ACTIVAS */
    listAct(){
        return http
            .get('acta/activas');
    }

    /* RETORNA UNA LISTA DE ACTAS ACTIVAS POR DECANATO */
    listDecanAct(id){
        return http
            .get('acta/activas/decanato/' + id);
    }

    /* RETORNA UNA LISTA DE TODAS LAS ACTAS POR DECANATO */
    listDecan(id){
        return http
            .get('acta/decanato/' + id);
    }

    
}

export default new ActaDataService();