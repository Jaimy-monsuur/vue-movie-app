<template>
  <navigation class="mb-1 mx-2" />
  <div v-if="error" class="alert alert-danger">{{ error }}</div>
  <div class="card mb-2 mx-2 mt-3">
    <div class="card-body">
      <h1 class="card-title">Create a new movie</h1>
      <form @submit.prevent="onSubmit" class="row g-2">
        <div class="col-md-6">
          <label for="title" class="form-label">Title</label>
          <input v-model="movie.title" type="text" class="form-control" id="title" required>
        </div>
        <div class="col-md-6">
          <label for="language" class="form-label">Language</label>
          <input v-model="movie.language" type="text" class="form-control" id="language" required>
        </div>
        <div class="col-md-6">
          <label for="length" class="form-label">Length</label>
          <input v-model="movie.length" type="number" class="form-control" id="length" required>
        </div>
        <div class="col-md-6">
          <label for="year" class="form-label">Year</label>
          <input v-model="movie.year" type="number" class="form-control" id="year" required>
        </div>
        <div class="col-md-6">
          <label for="director" class="form-label">Director</label>
          <input v-model="movie.director" type="text" class="form-control" id="director" required>
        </div>
        <div class="col-md-6">
          <label for="actors" class="form-label">Actors</label>
          <input v-model="movie.actors" type="text" class="form-control" id="actors" required>
        </div>
        <div class="col-12">
          <label for="plot" class="form-label">Plot</label>
          <textarea v-model="movie.plot" class="form-control" id="plot" rows="3" required></textarea>
        </div>
        <div class="col-12">
          <label for="url" class="form-label">URL</label>
          <input v-model="movie.url" type="url" class="form-control" id="url" required>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
  <my-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Movie } from '../interfaces/movie';
import movieService from '../services/movieService';
import Navigation from "@/components/navigation.vue";
import MyFooter from "@/components/footer.vue";

export default defineComponent({
  name: 'CreateMovieView',
  components: {MyFooter, Navigation},
  data() {
    return {
      movie: {} as Movie,
      error: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        const createdMovie = await movieService.createMovie(this.movie);
        console.log('Created movie:', createdMovie);
        // Redirect to the movie details page for the new movie
        console.log(createdMovie)
        this.$router.push({ name: 'MovieDetails', params: { id: createdMovie.data.ID } });
      } catch (error : any) {
        console.error('Error creating movie:', error);
        // Show an error message to the user
        this.error = error.response.data.message;
      }
    },
  },
});
</script>
