<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top mt-2">
    <router-link class="navbar-brand" to="/">My Movie App</router-link>
    <button class="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item mt-1">
          <LogoutButton />
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
import LogoutButton from "@/components/LogoutButton.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navigation',
  components: {
    LogoutButton
  }
};
</script>

<style scoped>
/* Custom styles for the Navigation component */
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-nav .nav-link {
  font-weight: bold;
  font-size: 1.2rem;
  color: #444;
}

.navbar-toggler {
  margin-left: auto;
}

nav{
  position: sticky;
  background-color: rgb(154, 179, 252);
  opacity: 80%;
  padding-left: 20px;
  border-radius: 5px;
}

.navbar-nav .nav-link:hover {
  color: #007bff;
}
</style>
