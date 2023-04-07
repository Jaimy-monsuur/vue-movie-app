import type {Review} from "@/interfaces/review";

export interface Movie {
    title: string;
    language: string;
    length: number;
    year: number;
    director: string;
    actors: string;
    plot: string;
    url: string;
}

export interface MovieComplete {
    ID: string;
    Title: string;
    Language: string;
    AVGRating: number;
    Actors: string;
    Director: string;
    Length: number;
    NrOfRatings: number;
    Plot: string;
    Reviews: Review[];
    Year: number;
    Url: string;
}

export default class type {
}