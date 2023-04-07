import axios from 'axios';
import type {AddReview, UpdateReview} from '../interfaces/review';
import store from '@/store';

//base url for the api
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
    createReview(data: AddReview) {
        return axiosInstance.post('/reviews/', data)
            .then(response => response.data);
    },
    updateReview(id: string, data: UpdateReview) {
        return axiosInstance.put(`/reviews/${id}`, data)
            .then(response => response.data);
    },
    deleteReviewById(id: string) {
        return axiosInstance.delete(`/reviews/${id}`)
            .then(response => response.data);
    },
    getReviewById(id: string) {
        return axiosInstance.get(`/reviews/review/${id}`)
            .then(response => response.data);
    }
}
