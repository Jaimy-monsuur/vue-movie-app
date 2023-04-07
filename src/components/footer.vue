<template>
  <footer class="footer mt-auto py-3 m-2">
    <div class="container">
      <span class="text-muted">My Movie App &copy; 2023</span>
    </div>
  </footer>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'myFooter',
}
</script>

<style scoped>
.footer {
  float: bottom;
  border-radius: 5px;
  background-color: rgb(154, 179, 252);
  padding: 1rem;
  border-top: 1px solid #ddd;

}
</style>
