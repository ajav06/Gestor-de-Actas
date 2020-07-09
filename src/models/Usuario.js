/* MODELO DE DATOS DE USUARIO PARA INICIAR SESIÓN Y REGISTRAR USUARIO */
export default class Usuario {
    constructor(id, username, email, password, decanato_id){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.decanato_id = decanato_id;
    }
}