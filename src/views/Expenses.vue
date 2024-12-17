<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import Loader from '../components/Loader.vue'
import { useExpenseStore } from '@/stores/expense.store'
import ExpenseTable from './ExpenseTable.vue'
import ExpenseFilter from './ExpenseFilter.vue';

const expenseStore = useExpenseStore()

const fetchExpenses = async () => {
  await expenseStore.fetchExpenses()
}

const filterExpenses = async (filters) => {
  await expenseStore.filterExpenseRecords(filters);
}

onMounted(() => {
  fetchExpenses()
})
</script>
<template>
  <section id="expensesList">
    <Loader v-if="expenseStore.loading"></Loader>
    <div v-if="expenseStore.error" class="alert alert-danger" role="alert">
      {{ expenseStore.error }}
    </div>
    <div class="container-fluid">
      <ExpenseFilter @filterRecords="filterExpenses" @clearFilter="fetchExpenses"></ExpenseFilter>
    </div>
    <br/>
    <div class="row">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Expenses</h5>
          <div class="expense-table">
            <ExpenseTable :expenses="expenseStore.expenseList" />
          </div>
          <!-- div>
            <nav aria-label="..." class="paginator">
              <ul class="pagination justify-content-end">
                <li class="page-item disabled">
                  <span class="page-link">Previous</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                  <span class="page-link">2</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div -->
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.employee-table {
  max-height: calc(100vh - 20%);
  overflow-y: auto;
}

.paginator {
  padding: 10px;
}
</style>
