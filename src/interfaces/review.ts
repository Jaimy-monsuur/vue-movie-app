
import type { User } from './user';
export interface Review {
    ID: string;
    MovieID: string;
    Content: string;
    User: User;
    Rating: number;
}

export interface AddReview {
    movieId: string;
    review: string;
    rating: number;
    userId: string;
    userName: string;
    MovieName: string;
}

export interface UpdateReview {
    rating: number;
    review: string;
}