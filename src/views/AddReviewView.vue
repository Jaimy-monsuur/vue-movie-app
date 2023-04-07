<template>
  <navigation/>
  <div class="add-review">
    <h2>Add a Review for {{ movieName }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="rating">Rating (1-5)</label>
        <input type="number" min="1" max="5" class="form-control" v-model.number="rating" required>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control" v-model="review" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <MyFooter/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { AddReview } from '@/interfaces/review';
import reviewService from '@/services/reviewService';
import store from '../store'
import Navigation from "@/components/navigation.vue";
import MyFooter from "@/components/footer.vue";
import movieService from "@/services/movieService";
import type {Review} from "@/interfaces/review";
import type {MovieComplete} from "@/interfaces/movie";

export default defineComponent({
  name: 'AddReviewView',
  components: {MyFooter, Navigation},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const movieId = route.params.id as string
    const movieName = ref<string>('');
    const rating = ref<number>(1);
    const review = ref<string>('');
    const user = store.state.user;

    async function submitForm() {

      const data = await movieService.getMovieById(movieId);
      const item = data.data;
      const reviews = [] as Review[];
      console.log(item);
      for (let i = 0; i < item.Reviews.length; i++) {
        const review = item.Reviews[i];
        review.Rating = Number(item.Reviews[i].Rating);
        review.ID = Number(item.Reviews[i].ID);
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

      const newReview: AddReview = {
        MovieID: movie2.ID,
        MovieName: movie2.Title,
        review: review.value,
        Rating: rating.value,
        userID: user.id,
        username: user.email
      }

      try {
        console.log(newReview)
        await reviewService.createReview(newReview);
        await router.push(`/movie/${movieId}`);
      } catch (error) {
        console.error(error);
      }
    }

    return { movieId, movieName, rating, review, submitForm };
  },
});
</script>

<style scoped>
.add-review {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  font-size: 1.2rem;
  font-weight: bold;
}

textarea {
  min-height: 150px;
}
</style>
