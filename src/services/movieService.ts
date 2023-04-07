import axios from 'axios';
import type { Movie } from '../interfaces/movie';
import store from '@/store';

const API_URL = 'https://go-movie-api-8yst.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.state.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    createMovie(data: Movie) {
        return axiosInstance.post('/movies/', data)
            .then(response => response.data);
    },
    updateMovie(id: string, data: Movie) {
        return axiosInstance.put(`/movies/${id}`, data)
            .then(response => response.data);
    },
    getMovies() {
        return axiosInstance.get('/movies/')
            .then(response => response.data);
    },
    getMovieById(id: string) {
        return axiosInstance.get(`/movies/${id}`)
            .then(response => response.data);
    },
    deleteMovieById(id: string) {
        return axiosInstance.delete(`/movies/${id}`)
            .then(response => response.data);
    }
}
