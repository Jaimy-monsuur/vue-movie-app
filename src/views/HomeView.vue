<template>
  <div class="container">
    <Navigation />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="card my-3">
      <div class="card-body">

        <div class="row d-flex justify-content-end">
          <h1 class="card-title col-md-10">All Movies</h1>
          <div class="col-md-2">
            <router-link v-if="//@ts-ignore
                                store.state.user.role === 'admin'" to="/movie/add/" class="btn btn-primary mt-1 mb-2">Add Movie</router-link>
          </div>

        </div>
        <div class="row">
          <div v-for="(movie, index) in movies" :key="index" class="col-md-4 mb-3">
            <div class="card h-100">
              <img :src="movie.Url" class="card-img-top movie-image" alt="Movie poster">
              <div class="card-body">
                <h5 class="card-title">{{ movie.Title }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Rating:</strong> {{ movie.AVGRating }} ({{ movie.NrOfRatings }} votes)</li>
              </ul>
              <div class="card-footer">
                <router-link :to="{ name: 'MovieDetails', params: { id: movie.ID } }" class="btn btn-primary">Details</router-link>
                <router-link v-if="//@ts-ignore
                                  store.state.user.role === 'admin'" :to="{ name: 'EditMovieView', params: { id: movie.ID } }" class="btn btn-success m-2">Edit</router-link>
                <button v-if="//@ts-ignore
                              movie.Reviews.length === 0 && store.state.user.role === 'admin'" @click="deleteMovie(movie.ID)" class="btn btn-danger m-2">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MyFooter />
</template>

<style scoped>

.movie-image {
  height: 300px;
  object-fit: cover;
}

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import movieService from '@/services/movieService'
import type { MovieComplete } from '@/interfaces/movie'
import Navigation from "@/components/navigation.vue";
import MyFooter from "@/components/footer.vue";
import store from "@/store";

export default defineComponent({
  name: 'MovieList',
  computed: {
    store() {
      return store
    }
  },
  components: {MyFooter, Navigation},
  data() {
    return {
      movies: [] as MovieComplete[],
      error: ''
    };
  },
  methods: {
    async deleteMovie(movieId: string) {
      try {
        await movieService.deleteMovieById(movieId);
        this.movies = this.movies.filter((movie) => movie.ID !== movieId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    try {
      const response = await movieService.getMovies();
      //add every item from response.data to movies
      for (const item of response.data) {
        const movie: MovieComplete = {
          ID: item.ID,
          Title: item.Title,
          Plot: item.Plot,
          Actors: item.Actors,
          Director: item.Director,
          Language: item.Language,
          Length: item.Length,
          NrOfRatings: item.NrOfRatings,
          Reviews: item.Reviews,
          Year: item.Year,
          AVGRating: item.AVGRating,
          Url: item.Url,
        };
        console.log('item: '+ JSON.stringify(item));
        console.log('object: '+ JSON.stringify(movie));
        this.movies.push(movie);
      }
    } catch (error: any) {
      // Handle the error (e.g. show an error message)
      console.error(error)

      try {
        this.error = error.response.data.message;
      } catch (error) {
        this.error = "Something went wrong";
      }
    }
  }
})
</script>
