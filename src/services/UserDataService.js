import http from '../assets/http-common'

class UserDataService {
    login(data){
        return http
            .post('auth/token/login', {
                username: data.username.toLowerCase(),
                password: data.password
            })
    }

    logout(){
        return http.post('auth/token/logout', {});
    }

    register(data){
        return registerScript(data);
    }
}

export default new UserDataService();