<template>
  <div>
    <navigation/>
    <div class="container my-3">
      <div class="card shadow-lg">
        <img class="card-img-top image" :src="loginImage" alt="Movie image">
        <div class="card-body">
          <h1 class="card-title text-center">About Us</h1>
          <p class="card-text text-center">This is the My Movie Application.</p>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import navigation from '@/components/navigation.vue'
import MyFooter from '@/components/footer.vue'
import loginImage from "@/components/images/movie.jpg"

export default {
  name: 'AboutPage',
  components: {
    navigation,
    MyFooter,
  },
  data() {
    return {
      loginImage: loginImage
    }
  }
}
</script>

<style scoped>
/* Custom styles for the About page */
.card {
  border: none;
  border-radius: 10px;
}

.card-title {
  font-size: 2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  line-height: 2.5rem;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
