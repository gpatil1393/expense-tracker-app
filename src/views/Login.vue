<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.store';
import Loader from '@/components/Loader.vue';
const router = useRouter();
const userStore = useUserStore();
const { isLoading } = userStore;
const userForm = ref({ username: "", password: "" });
const submitHandler = async () => {
    await userStore.login({ ...userForm.value });
    router.replace({ path: "/" });
}
</script>
<template>
    <div class="container">
        <Loader v-if="isLoading"></Loader>
        <form @submit.prevent="submitHandler">
        <div class="card border-primary mb-3">
            <div class="card-header">
                <h5 class="card-title">Sign In</h5>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="username" class="form-label">Email</label>
                        <input 
                        type="text" 
                        name="login" 
                        placeholder="Login" 
                        aria-label="Login" 
                        autocomplete="username" 
                        required 
                        v-model="userForm.username"
                        class="form-control"
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Passwrd</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        aria-label="Password" 
                        autocomplete="current-password" 
                        required 
                        v-model="userForm.password"
                        class="form-control"
                    />
                </div>
            </div>
            <div class="card-footer">
                <button type="submit" class="btn btn-primary">Sign In</button>
                <br/>
                <div class="sign-up">
                    <label>Don't have an account?</label>&nbsp;
                    <RouterLink to="register">Sign Up</RouterLink>
                </div>
            </div>
        </div>
    </form>
    </div>
</template>
<style scoped>
    .container {
        padding: 10%;
    }
    .card-footer {
        text-align: end;
    }
    .sign-up {
        text-align: left;
    }
</style>