/* MODELO DE DATOS DE Decanato */
export default class Decanato {
    constructor(codigo, nombre, siglas, estatus='A'){
        this.codigo = codigo;
        this.nombre = nombre;
        this.siglas = siglas;
        this.estatus = estatus;
    }
}