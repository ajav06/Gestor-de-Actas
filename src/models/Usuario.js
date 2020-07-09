/* MODELO DE DATOS DE USUARIO PARA INICIAR SESIÓN Y REGISTRAR USUARIO */
export default class Usuario {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}