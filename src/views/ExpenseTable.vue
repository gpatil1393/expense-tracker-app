<script setup>
import router from '@/router';
import { useExpenseStore } from '@/stores/expense.store';
import { defineProps, ref, useTemplateRef } from 'vue';
import { Toast } from 'bootstrap';
import Loader from '@/components/Loader.vue';

const { expenses } = defineProps(['expenses'])
const expenseStore = useExpenseStore();

const editExpense = (expense) => {
    router.push(`/expense/edit/${expense.id}`);
}

const toastMessage = ref(null);

const toastRef = useTemplateRef('toast')

const deleteExpense = async (expenseId) => {
    const expenseStore = useExpenseStore();
    const isDeleted = await expenseStore.deleteExpense(expenseId);
    if (isDeleted) {
        toastMessage.value = 'Expense record updated successfully!';
        new Toast(toastRef.value, {
            autohide: true,
            delay: 2500
        }).show();
        await expenseStore.fetchExpenses();
    }
}
</script>
<template>
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
  <table class="table table-hover table-striped table-responsive">
    <thead>
      <tr>
        <th>Expense Date</th>
        <th>Category</th>
        <th>Description</th>
        <th>Payment Method</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="expense in expenses" :key="expense.id">
        <td>{{ expense.expenseDate }}</td>
        <td>{{ expense.category.categoryName }}</td>
        <td>{{ expense.description }}</td>
        <td>{{ expense.paymentMethod }}</td>
        <td>{{ expense.amount }}</td>
        <td>
          <i
            class="fa-solid fa-pencil et-icon"
            style="color: #6b9ef5"
            @click="editExpense(expense)"
          ></i>
          &nbsp;
          <i
            class="fa-solid fa-trash-can et-icon"
            style="color: #ec2213"
            @click="deleteExpense(expense.id)"
          ></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.et-icon {
    cursor: pointer;
}
</style>
