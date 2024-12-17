<script setup>
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { useExpenseStore } from '@/stores/expense.store';
import Loader from '../components/Loader.vue';
import InputWithError from '@/components/InputWithError.vue';
import { Toast } from 'bootstrap';
const router = useRouter();
const expenseStore = useExpenseStore();
const expense = reactive({
    categoryId: "0", 
    amount: "0", 
    paymentMethod: "", 
    expenseDate: "", 
    description: "", 
});

const toastMessage = ref(null);
const toastRef = useTemplateRef('toast')

const submitHandler = async () => {
    await expenseStore.validate(expense);
    if (Object.keys(expenseStore.validationErrors).length === 0) {
        const newExpense = await expenseStore.saveExpense({ ...expense });
        if (newExpense) {
            toastMessage.value = 'Expense record saved successfully!';
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

const resetExpenseForm = () => {
    expense.categoryId = "0";
    expense.amount = "0";
    expense.paymentMethod = "";
    expense.expenseDate = "";
    expense.description = ""; 
}

const clearFieldError = async (fieldKey) => {
    // delete validationErrors[fieldKey];
    await expenseStore.clearValidationError(fieldKey);
}

onMounted(async () => {
    console.log("On Mounted", expenseStore.expenseCategories);
    console.log("expenseStore.expenseCategories.length: ", expenseStore.expenseCategories.length);
    if (expenseStore.expenseCategories && expenseStore.expenseCategories.length === 0) {
        console.log("Fetching categories...");
        await expenseStore.fetchExpenseCategories();
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
        <form @submit.prevent="submitHandler">
            <div class="card border-primary mb-9">
                <div class="card-header">
                    <h5 class="card-title">Add New Expense</h5>
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
                    <button type="button" class="btn btn-primary" @click="resetExpenseForm">Reset</button>&nbsp;
                    <button type="submit" class="btn btn-success">Save</button>
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