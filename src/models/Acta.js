/* MODELO DE DATOS DE ACTA */
export default class Acta {
    constructor(codigo, tipo_sesion, fecha_sesion, pdf, resumen, decanato=1, estatus='A'){
        this.codigo = codigo;
        this.fecha_sesion = fecha_sesion;
        this.tipo_sesion = tipo_sesion;
        this.pdf = pdf;
        this.resumen = resumen;
        this.decanato = {
            codigo: decanato
        };
        this.estatus = estatus;
    }
}