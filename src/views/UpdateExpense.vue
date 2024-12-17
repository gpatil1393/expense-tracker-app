<script setup>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { useExpenseStore } from '@/stores/expense.store';
import Loader from '../components/Loader.vue';
import InputWithError from '@/components/InputWithError.vue';
import { Toast } from 'bootstrap';
const router = useRouter();
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const expenseStore = useExpenseStore();
const expense = ref(null);

const toastMessage = ref(null);
const toastRef = useTemplateRef('toast')

const submitHandler = async () => {
    const expenseObj = expense.value;
    await expenseStore.validate(expenseObj);
    if (Object.keys(expenseStore.validationErrors).length === 0) {
        const updatedExpense = await expenseStore.updateExpense({ ...expenseObj });
        if (updatedExpense) {
            toastMessage.value = 'Expense record updated successfully!';
            setTimeout(() => {
                router.replace({ path: "/" });
            }, 1500);
            new Toast(toastRef.value, {
                autohide: true,
                delay: 2500
            }).show();
        }
    }
    // console.log("userForm.value: ", userForm);
    // await userStore.register({ ...userForm });
    // router.replace({ path: "/" });
}

const clearFieldError = async (fieldKey) => {
    // delete validationErrors[fieldKey];
    await expenseStore.clearValidationError(fieldKey);
}

const cancelEdit = () => {
    router.push("/");
}

onMounted(async () => {
    console.log("On Mounted", expenseStore.expenseCategories);
    console.log("expenseStore.expenseCategories.length: ", expenseStore.expenseCategories.length);
    if (expenseStore.expenseCategories && expenseStore.expenseCategories.length === 0) {
        console.log("Fetching categories...");
        await expenseStore.fetchExpenseCategories();
    }

    const expenseToEdit = expenseStore.expenseList.find(expense => expense.id === Number(props.id))
    console.log("expenseToEdit: ", expenseToEdit);
    console.log("props.id: ", props.id);
    if (expenseToEdit) {
        expense.value = { ...expenseToEdit }
        console.log("expense.value: ", expense.value);
    } else {
        // If todo not found, redirect to list
        router.push('/')
    }
})

</script>
<template>
    <div class="container-fluid">
        <Loader v-if="expenseStore.loading"></Loader>
        <div class="toast-container position-absolute top-0 end-0 p-3" id="toastPlacement">
            <div class="toast align-items-center text-white bg-primary border-0" role="alert" 
                aria-live="assertive" aria-atomic="true" ref="toast">
                <div class="d-flex">
                    <div class="toast-body">
                        {{ toastMessage }}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        <form @submit.prevent="submitHandler" v-if="expense">
            <div class="card border-primary mb-9">
                <div class="card-header">
                    <h5 class="card-title">Edit Expense</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-floating mb-3">
                                <select class="form-select" id="expenceCategory" 
                                    aria-label="Expense Categories" v-model="expense.categoryId">
                                    <option :value="'0'">---Select---</option>
                                    <option 
                                        v-for="category in expenseStore.expenseCategories" :key="category.id"
                                        :value="category.id"
                                        >{{category.categoryName}}</option>
                                </select>
                                <label for="expenceCategory" class="form-label">Expense Category</label>
                                <small class="error-text" v-if="expenseStore.validationErrors.categoryId">{{ expenseStore.validationErrors.categoryId }}</small>
                            </div>
                        </div>
                        <div class="col">
                            <InputWithError
                                :type="'number'"
                                :inputId="'amount'"
                                :placeholder="'Amount'"
                                :label="'Amount'"
                                :name="'amount'"
                                :error="expenseStore.validationErrors.amount"
                                :floatingLabel="true"
                                fieldKey="'amount'"
                                @clearError="clearFieldError(fieldKey)"
                                v-model:vModel="expense.amount"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-floating mb-3">
                                <select class="form-select" id="paymentMethod" aria-label="Payment Method" v-model="expense.paymentMethod">
                                    <option :value="''">---Select---</option>
                                    <option 
                                        v-for="paymentMethod in expenseStore.paymentMethods" :key="paymentMethod.value"
                                        :value="paymentMethod.value"
                                        >{{paymentMethod.text}}</option>
                                </select>
                                <label for="paymentMethod" class="form-label">Payment Method</label>
                                <small class="error-text" v-if="expenseStore.validationErrors.paymentMethod">{{ expenseStore.validationErrors.paymentMethod }}</small>
                            </div>
                        </div>
                        <div class="col">
                            <InputWithError
                                :type="'date'"
                                :inputId="'expenseDate'"
                                :placeholder="'Expense Date'"
                                :label="'Expense Date'"
                                :name="'expenseDate'"
                                :error="expenseStore.validationErrors.expenseDate"
                                :floatingLabel="true"
                                fieldKey="'expenseDate'"
                                @clearError="clearFieldError(fieldKey)"
                                v-model:vModel="expense.expenseDate"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <InputWithError
                                :type="'textarea'"
                                :inputId="'description'"
                                :placeholder="'Descripion'"
                                :label="'Description'"
                                :name="'description'"
                                :rows="3"
                                :cols="100"
                                :error="expenseStore.validationErrors.description"
                                :floatingLabel="true"
                                fieldKey="'description'"
                                @clearError="clearFieldError(fieldKey)"
                                v-model:vModel="expense.description"
                            />
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-danger" @click="cancelEdit">Cancel</button>&nbsp;
                    <button type="submit" class="btn btn-success">Update</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
.card-footer {
    text-align: right;
}
.error-text {
    color: #FF0000;
}
</style>