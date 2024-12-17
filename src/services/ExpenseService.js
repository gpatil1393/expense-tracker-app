import axios from "axios";
import { useSessionStorage } from "@vueuse/core";

const API_BASE_URL = 'http://localhost:8080/expenses';

export const ExpenseService = {
    async fetchExpenseCategories() {
        console.log(useSessionStorage("authToken", null).value);
        const response = await axios.get(`${API_BASE_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    },

    async saveExpenseRecord(expense) {
        const loggedInUser = JSON.parse(useSessionStorage("loggedInUser").value);
        console.log("expense: ", expense);
        const finalExpense = {
            ...expense,
            userId: loggedInUser.id
        }
        const response = await axios.post(`${API_BASE_URL}`, {...finalExpense}, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    },

    async updateExpenseRecord(expense) {
        const loggedInUser = JSON.parse(useSessionStorage("loggedInUser").value);
        console.log("expense: ", expense);
        const finalExpense = {
            ...expense,
            userId: loggedInUser.id
        }
        const response = await axios.put(`${API_BASE_URL}/${expense.id}`, {...finalExpense}, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    },

    async deleteExpense(expenseId) {
        const response = await axios.delete(`${API_BASE_URL}/${expenseId}`, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.status === 204;
    },

    async fetchAllExpenses() {
        const response = await axios.get(`${API_BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    },
    async filterExpenseRecords(filters) {
        const reqParams = {};
        if (filters.categoryId) {
            reqParams['categoryId'] = filters.categoryId;
        }
        if (filters.expenseStartDate) {
            reqParams['start'] = filters.expenseStartDate;
        }
        if (filters.expenseEndDate) {
            reqParams['end'] = filters.expenseEndDate;
        }
        const response = await axios.get(`${API_BASE_URL}`, {
            params: {
                ...reqParams
            },
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    },
    async fetchMonthlyExpenseReport() {
        const response = await axios.get(`${API_BASE_URL}/monthly/report`, {
            headers: {
                Authorization: `Bearer ${useSessionStorage("authToken").value}`
            }
        });
        return response.data;
    }
}