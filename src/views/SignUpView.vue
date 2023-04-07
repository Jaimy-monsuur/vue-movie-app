<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <div class="row">
        <div class="col-md-6">
          <h1 class="text-center">Sign Up</h1>
          <form >
            <div class="form-group px-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control" required>
            </div>
            <div class="form-group px-3">
              <label>First Name</label>
              <input v-model="firstName" type="text" class="form-control" required>
            </div>
            <div class="form-group px-3">
              <label>Last Name</label>
              <input v-model="lastName" type="text" class="form-control" required>
            </div>
            <div class="form-group px-3">
              <label>Password</label>
              <input v-model="password" type="password" class="form-control" required>
            </div>
            <div class="form-group px-3 pt-3">
              <button type="button" @click="signup()" class="btn btn-primary btn-block px-3" >Sign Up</button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <img :src="signupImage" alt="placeholder image" class="img-fluid">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import authService from '@/services/loginService'
import store from '@/store';
import type { SignUpRequest } from '@/interfaces/auth'
import signupImage from "@/components/images/movie.jpg"

export default defineComponent({
  name: 'SignUp_view',
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      error: '',
      signupImage
    };
  },
  methods: {
    async signup() {
      try {
        const data: SignUpRequest = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        }
        const response = await authService.signUp(data);
        const user = response.data.data;
        console.log(user)
        // Redirect to another page or show a success message
        this.$router.push('/login');
      } catch (error: any) {
        // Handle the error (e.g. show an error message)
        console.error(error)

        try {
          this.error = error.response.data.message;
        } catch (error) {
          this.error = "Something went wrong";
        }

      }
    },
  },
})
</script>
