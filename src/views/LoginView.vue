<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card p-4">
      <div class="row">
        <div class="col-md-6">
          <h1 class="text-center">Login</h1>
          <form >
            <div class="form-group px-3">
              <label>Email</label>
              <input v-model="email" type="email" class="form-control" required>
            </div>
            <div class="form-group px-3">
              <label>Password</label>
              <input v-model="password" type="password" class="form-control" required>
            </div>
            <div class="form-group px-3 pt-3">
              <button type="button" @click="login()" class="btn btn-primary btn-block px-3" >Login</button>
            </div>
            <div class="form-group px-3 pt-3">
              <p class="text-center">Don't have an account? <router-link to="/signUp">Sign Up now.</router-link></p>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <img :src="loginImage" alt="placeholder image" class="img-fluid">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import authService from '@/services/loginService'
import store from '@/store';
import type { LoginRequest } from '@/interfaces/auth'
import loginImage from "@/components/images/movie.jpg"

export default defineComponent({
  name: 'Login_view',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loginImage
    };
  },
  methods: {
    async login() {
      try {
        const data: LoginRequest = {
          email: this.email,
          password: this.password,
        }
        const response = await authService.login(data);
        const token = response.data.data.token;
        const user = response.data.data.user;
        // Redirect to another page or show a success message
        await store.dispatch('setToken', {token});
        await store.dispatch('setUser', {user});
        console.log("stored token: "+store.state.token);
        console.log("stored user: "+ JSON.stringify(store.state.user));
        this.$router.push('/');
      } catch (error: any) {
        // Handle the error (e.g. show an error message)
        console.error(error)
        if (error.response.data.error === undefined) {
          this.error = "An error occurred."
        } else {
          this.error = error.response.data.error
        }
      }
    },
  },
})
</script>
