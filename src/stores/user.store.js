import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core'
import { AuthService } from '@/services/AuthService';
import { UserService } from '@/services/UserService';

const usePrivateState = defineStore('secret-store', () => {
    const username = ref(null)
    return { username }
})

export const useUserStore = defineStore('userStore', () => {
    const privateState = usePrivateState();
    const loading = ref(false);
    const load = (userForm) => {
        const username = useStorage("username").value;
        // const un = localStorage.getItem("username")
        console.log("username:" + username)
        if (username) {
            privateState.username = username;
        }
    }


    const login = async (userForm) => {
        if (userForm.username) {
            // localStorage.setItem("username", userForm.username);
            loading.value =true;
            const authResponse = await AuthService.login(userForm.username, userForm.password)
            console.log("authResponse:", authResponse)
            if (authResponse.user) {
                privateState.username = authResponse.user.email;
                useStorage("loggedInUser", authResponse.user, sessionStorage);
                useStorage("authToken", authResponse.jwtToken, sessionStorage);
                useStorage("username", authResponse.user.username);
                privateState.username = authResponse.user.username;
            }
            loading.value = false;
            return authResponse;
        } else {
            loading.value =false;
            throw "Error: UN is null"
        }
    }

    const register = async (user) => {
        loading.value = true;
        const response = await UserService.register(user);
        loading.value = false;
        return response;
    }

    const logout = () => {
        privateState.username = null;
        // localStorage.removeItem("username");

        const loggedInUser = useStorage("loggedInUser");
        const authToken = useStorage("authToken");
        const username = useStorage("username");

        loggedInUser.value = null;
        authToken.value = null;
        username.value = null;
        sessionStorage.clear();
    }
    const isAuthenticated = computed(() => {
        const result = !!privateState.username
        return result
    })

    const username = computed(() => privateState.username)
    const isLoading = computed(() => loading);

    return { load, login, logout, register, isAuthenticated, username, isLoading }
});

