<script setup>
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user.store';
const userStore = useUserStore()
userStore.load();
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
