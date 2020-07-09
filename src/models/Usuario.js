/* MODELO DE DATOS DE USUARIO PARA INICIAR SESIÓN Y REGISTRAR USUARIO */
export default class Usuario {
    constructor(id, username, email, password, decanato_id=1, rol=1){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.decanato_id = decanato_id;
        this.rol = rol;
    }

    setRol(){
        if(this.rol == 1)
            this.rol = ['secretario']
        else if(this.rol == 2)
            this.rol = ['admin']
    }
}