<template>
  <div class="container">
    <Navigation />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="card my-3">
      <div class="card-body">
        <h1 class="card-title">Edit Review</h1>
        <form>
          <div class="mb-3">
            <label for="rating" class="form-label">Rating</label>
            <input type="number" class="form-control" id="rating" v-model="rating" />
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea class="form-control" id="content" rows="5" v-model="content"></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="editReview">Save</button>
        </form>
      </div>
    </div>
  </div>
  <MyFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/navigation.vue';
import MyFooter from '@/components/footer.vue';
import reviewService from '@/services/reviewService';
import type {Review, UpdateReview} from '@/interfaces/review';

export default defineComponent({
  name: 'EditReviewView',
  components: { Navigation, MyFooter },
  data() {
    return {
      rating: 0,
      content: '',
      error: '',
    };
  },
  async mounted() {
    try {
      const reviewId = this.$route.params.id as string;
      const response = await reviewService.getReviewById(reviewId);
      console.log(response.data);
      const review: Review = response.data;
      this.rating = review.Rating;
      this.content = review.Content;
    } catch (error: any) {
      console.error(error);

      try {
        this.error = error.response.data.message;
      } catch (error) {
        this.error = 'Something went wrong';
      }
    }
  },
  methods: {
    async editReview() {
      try {
        const reviewId = this.$route.params.id as string;
        const UpdateReview: UpdateReview = {
          rating: Number(this.rating),
          review: this.content,
        };
        const response = await reviewService.updateReview(reviewId, UpdateReview);
        this.$router.push({ name: 'MovieDetails', params: { id: response.data.MovieID } });
      } catch (error: any) {
        console.error(error);

        try {
          this.error = error.response.data.message;
        } catch (error) {
          this.error = 'Something went wrong';
        }
      }
    },
  },
});
</script>
