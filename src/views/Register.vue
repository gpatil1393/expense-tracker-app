<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user.store';
import Loader from '../components/Loader.vue';
import InputWithError from '@/components/InputWithError.vue';
const router = useRouter();
const userStore = useUserStore();
const { isLoading } = userStore;
const userForm = reactive({
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: ""
});

const validationErros = ref({});

watch(() => userForm.confirmPassword, (newValue, oldValue) => {
    if (newValue !== userForm.password) {
        validationErros.value['confirmPassword'] = "Password and Confirm Password doesn't match"
    } else if (validationErros.value['confirmPassword']) {
        delete validationErros.value['confirmPassword'];
    }
})
const submitHandler = async () => {
    console.log("userForm.value: ", userForm);
    await userStore.register({ ...userForm });
    router.replace({ path: "/" });
}

const clearFieldError = (fieldKey) => {
    delete validationErros[fieldKey];
}

</script>
<template>
    <div class="container-fluid">
        <Loader v-if="isLoading"></Loader>
        <form @submit.prevent="submitHandler">
            <div class="card border-primary mb-9">
                <div class="card-header">
                    <h5 class="card-title">Sign Up</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" name="firstName" id="firstName" placeholder="First Name"
                                    aria-label="firstName" autocomplete="First Name" required
                                    v-model="userForm.firstName" class="form-control" />
                                <label for="firstName" class="form-label">First Name</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" name="lastName" id="lastName" placeholder="Last Name" aria-label="Last Name"
                                    autocomplete="Last Name" v-model="userForm.lastName" class="form-control" />
                                <label for="lastName" class="form-label">Last Name</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-floating mb-3">

                        <input type="text" name="username" id="username" placeholder="Username" aria-label="Username"
                            autocomplete="Username" v-model="userForm.username" class="form-control" />
                        <label for="username" class="form-label">Username</label>
                    </div>
                    <div class="form-floating mb-3">

                        <input type="email" name="email" id="email" placeholder="Email" aria-label="Email"
                            autocomplete="Email" v-model="userForm.email" class="form-control" />
                        <label for="email" class="form-label">Email</label>
                    </div>
                    <div class="form-floating mb-3">

                        <input type="password" name="password" id="password" placeholder="Password"
                            aria-label="Password" autocomplete="Password" v-model="userForm.password"
                            class="form-control" />
                        <label for="password" class="form-label">Password</label>
                    </div>
                    <InputWithError 
                        :type="'password'"
                        :name="'confirmPassword'"
                        :inputId="'confirmPassword'"
                        :placeholder="'Confirm Password'"
                        :label="'Confirm Password'"
                        :floatingLabel="true"
                        :error="validationErros.confirmPassword"
                        :fieldKey="'confirmPassword'"
                        v-model:vModel="userForm.confirmPassword"
                        @clearError="clearFieldError"
                    />
                    <!-- div class="form-floating mb-3">
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="Confirm Password" aria-label="Confirm Password" autocomplete="Confirm Password"
                            v-model="userForm.confirmPassword" class="form-control" />
                        <label for="confirmPassword" class="form-label">Password</label>
                        <small v-if="validationErros['confirmPassword']">{{ validationErros['confirmPassword'] }}</small>
                    </div -->
                </div>
                <div class="card-footer">
                    <RouterLink to="login" class="btn btn-primary">Back</RouterLink>&nbsp;
                    <button type="submit" class="btn btn-success">Register</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
.container-fluid {
    padding-top: 5%;
}

.card-footer {
    text-align: end;
}
</style>