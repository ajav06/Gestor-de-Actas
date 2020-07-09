/* METODO PARA OBTENER EL TOKEN DEL USUARIO ACTIVO */

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    /* VERIFICA SI EL USUARIO ESTA ACTIVO,
    *  REVISA QUE HAYAS DATOS EN EL JSON LOCAL
    */
    if (user && user.accessToken){
        /* SI HAY ES DECIR QUE ESTA ACTIVO, ASI QUE RETORNA SU TOKEN */
        return 'Bearer ' + user.accessToken;
    } else {
        /* EN CASO CONTRARIO, RETORN VACIO */
        return null;
        /* return 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTk0Mjk2NTE3LCJleHAiOjE1OTQzODI5MTd9.vZNXO4_cYRwCVB446oHfw8kE0KPEGvlIv3NpX0uodh6W2tvBXJmZyBnizqYsOq70HUcWTgQAw35RTw0IGo86kg'; */
    }
}