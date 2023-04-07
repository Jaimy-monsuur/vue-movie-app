<template>
  <navigation/>
  <div class="movie-details">
    <div class="card">
      <img :src="movie.Url" class="card-img-top movie-image" :alt="movie.Title">
      <div class="card-body">
        <h3 class="card-title">{{ movie.Title }}</h3>
        <p class="card-text">{{ movie.Plot }}</p>
        <hr>
        <h5 class="card-subtitle mb-3 text-muted">{{ movie.Year }}</h5>
        <p class="card-text"><strong>Director:</strong> {{ movie.Director }}</p>
        <p class="card-text"><strong>Actors:</strong> {{ movie.Actors }}</p>
        <p class="card-text"><strong>Language:</strong> {{ movie.Language }}</p>
        <p class="card-text"><strong>Length:</strong> {{ movie.Length }}</p>
        <p class="card-text"><strong>Number of Ratings:</strong> {{ movie.NrOfRatings }}</p>
        <p class="card-text"><strong>Average Rating:</strong> {{ movie.AVGRating }}</p>
        <hr>
        <h5 class="card-subtitle mb-3 text-muted">Reviews</h5>
        <router-link :to="{ name: 'AddReviewView', params: { id: $props.id } }" class="btn btn-primary m-3">Add review</router-link>
        <ul class="review-list">
          <li v-for="review in movie.Reviews" :key="review.ID" class="mb-3">
            <div class="card">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">{{ review.Rating }} stars, User: {{review.User.Email}}</h6>
                <p class="card-text">{{ review.Content }}</p>
                <router-link v-if="review.User.ID === store.state.user.id" :to="{ name: 'EditReviewView', params: { id: review.ID } }" class="btn btn-warning m-2">Update</router-link>
                <!-- Add delete button for admin users -->
                <button v-if="store.state.user.role === 'admin'" @click="deleteReview(review.ID)" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <my-footer/>
</template>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.movie-image {
  height: 350px;
  object-fit: cover;
}

.card-subtitle {
  font-size: 1.1rem;
}

.card-text {
  font-size: 1.2rem;
}

.card-text strong {
  font-weight: bold;
}

.review-list {
  overflow-y: scroll;
  max-height: 400px;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { MovieComplete } from '@/interfaces/movie';
import type { Review } from '@/interfaces/review';
import movieService from '@/services/movieService';
import Navigation from "@/components/navigation.vue";
import MyFooter from "@/components/footer.vue";
import reviewService from "@/services/reviewService";
import store from "@/store";

export default defineComponent({
  name: 'MovieDetailsView',
  computed: {
    store() {
      return store
    }
  },
  components: {MyFooter, Navigation},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async deleteReview(reviewId: string) {
      console.log(reviewId);

      try {
        await reviewService.deleteReviewById(reviewId);
        // Remove the deleted review from the list
        this.movie.Reviews = this.movie.Reviews.filter((review) => review.ID !== reviewId);
      } catch (error) {
        console.error(error);
      }
    },
  },
  setup(props) {
    const movie = ref<MovieComplete>({} as MovieComplete);

    onMounted(async () => {
      const id = props.id;
      try {
        const data = await movieService.getMovieById(id);
        const item = data.data;
        const reviews = [] as Review[];
        console.log(item);
        for (let i = 0; i < item.Reviews.length; i++) {
          const review = item.Reviews[i];
          review.Rating = Number(item.Reviews[i].Rating);
          review.ID = item.Reviews[i].ID;
          review.MovieID = Number(item.Reviews[i].MovieID);
          review.Content = item.Reviews[i].Content;
          review.User = item.Reviews[i].User;
          reviews.push(review);
        }

        const movie2: MovieComplete = {
          ID: item.ID,
          Title: item.Title,
          Plot: item.Plot,
          Actors: item.Actors,
          Director: item.Director,
          Language: item.Language,
          Length: item.Length,
          NrOfRatings: item.NrOfRatings,
          Reviews: reviews,
          Year: item.Year,
          AVGRating: item.AVGRating,
          Url: item.Url,
        };
        movie.value = movie2;
      } catch (error) {
        console.error(error);
      }
    });

    return { movie };
  },
});
</script>
