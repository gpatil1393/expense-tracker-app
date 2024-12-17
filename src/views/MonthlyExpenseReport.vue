<script setup>
import router from '@/router';
import { useExpenseStore } from '@/stores/expense.store';
import { defineProps, onMounted, ref, useTemplateRef } from 'vue';
import { Toast } from 'bootstrap';
/*import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'*/
import Loader from '@/components/Loader.vue';

const expenseStore = useExpenseStore();

const toastMessage = ref(null);
// const chartData = ref([]);

//ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const toastRef = useTemplateRef('toast')
const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};

onMounted(async () => {
    await expenseStore.fetchMonthlyExpenseReport();
    /*const labels = [];
    const dataset = {
       label: "Monthly Expenses",
       backgroundColor: '#f87979',
       data: [] 
    };
    console.log("dataset: ", dataset);
    expenseStore.monthlyExpenses.forEach((expense) => {
      labels.push(`${months[expense.month]}/${expense.year}`);
      datasets.data.push(expense.amount);
    });
    chartData.value.push({
      labels,
      datasets: [dataset]
    })*/
})

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
        <th>Year</th>
        <th>Month</th>
        <th>Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="expense in expenseStore.monthlyExpenses" :key="`${expense.year}-${expense.month}`">
        <td>{{ months[expense.year] }}</td>
        <td>{{ expense.month }}</td>
        <td>{{ expense.amount }}</td>
      </tr>
    </tbody>
    <tfoot>
        <th colspan="2">Total: </th>
        <th>{{ expenseStore.monthlyExpenses.map(e => e.amount).length > 0 ? expenseStore.monthlyExpenses.map(e => e.amount).reduce((a,b) => a + b) : 0 }}</th>
    </tfoot>
  </table>
  <!-- div id="expense-chart">
    <Bar
      id="expense-chart-id"
      :options="{
        responsive: true,
        maintainAspectRatio: false
      }"
      :data="chartData"
    />
  </div -->
</template>
<style scoped>
.et-icon {
    cursor: pointer;
}
</style>
