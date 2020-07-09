/* METODO PARA OBTENER EL TOKEN DEL USUARIO ACTIVO */

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    /* VERIFICA SI EL USUARIO ESTA ACTIVO,
    *  REVISA QUE HAYAS DATOS EN EL JSON LOCAL
    */
    if (user && user.accessToken){
        /* SI HAY ES DECIR QUE ESTA ACTIVO, ASI QUE RETORNA SU TOKEN */
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        /* EN CASO CONTRARIO, RETORN VACIO */
        return {};
    }
}