<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user.store';
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
    logoutUser();
});

const logoutUser = async () => {
    await userStore.logout();
    router.replace({ path: "/" });
}
</script>
<template>
    <div class="container">
        <h4>Logging out...</h4>
    </div>
</template>
<style scoped>
    .container {
        padding: 10%;
    }
</style>