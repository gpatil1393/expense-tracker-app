<script setup>
import Header from './Header.vue'
</script>
<template>
  <Header></Header>
  <main>
    <div class="container-fluid">
      <RouterView />
    </div>
  </main>
</template>
<style scoped></style>
