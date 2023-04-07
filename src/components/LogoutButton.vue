<template>
  <button class="btn btn-primary" @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LogoutButton",
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.dispatch("logout");
      router.push({ name: "login" });
    };

    return {
      logout
    };
  }
});
</script>
