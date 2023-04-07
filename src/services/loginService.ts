import axios from 'axios';
import type { LoginRequest, SignUpRequest } from '../interfaces/auth'
const url = 'https://go-movie-api-8yst.onrender.com'

export default {

    login(data: LoginRequest) {
        return axios
            .post(url + '/auth/login', data)
            .then(response => response);
    },
    signUp(data : SignUpRequest) {
        return axios
            .post(
                url + '/users/', data)
            .then(response => response);
    }
}