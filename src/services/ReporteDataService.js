import http from '../assets/http-common';

/* CLASE QUE LLAMA LOS SERVICIOS DE LA API */
class ReporteDataService {

    /* RETORNA EL REPORTE TOTAL  */
    getTotal(){
        return http
            .get('reporte/');
    }

    /* RETORNA EL REPORTE TOTAL POR DECANATO */
    getDecanato(id) {
        return http
            .get('reporte/'+id);
    }

    /* RETORNA EL REPORTE TOTAL POR DECANATO Y AÑO*/
    getDecanatoAnno(id, anno) {
        return http
            .get('reporte/' + id + '/' + anno);
    }

    /* RETORNA EL REPORTE TOTAL DE UN AÑO*/
    getAnno(anno) {
        return http
            .get('reporte/ano/' + anno);
    }
   
    
}

export default new ReporteDataService();