import { defineStore } from 'pinia';
import { useLocalStorage, useSessionStorage, useStorage } from '@vueuse/core'
import { ExpenseService } from '@/services/ExpenseService';

export const useExpenseStore = defineStore('expenseStore', {
    state: () => ({
        loading: false,
        expense: null,
        expenseCategories: [],
        validationErrors: {},
        expenseList: [],
        monthlyExpenses: [],
        paymentMethods: [
            {
                value: 'UPI',
                text: 'UPI'
            },
            {
                value: 'CASH',
                text: 'Cash'
            },
            {
                value: 'CHEQUE',
                text: 'Cheque'
            }
        ]
    }),
    actions: {
        async fetchExpenseCategories() {
            this.loading = true;
            try {
                const expenseCategories = useLocalStorage('expenseCategories');
                // console.log("expenseCategories action: ", expenseCategories.value)
                if (expenseCategories && expenseCategories.value.length > 0) {
                    this.loading = false;
                    this.expenseCategories = JSON.parse(expenseCategories.value);
                    return;
                }
                this.loading = false;
                const categories = await ExpenseService.fetchExpenseCategories();
                useStorage('expenseCategories', categories);
                this.expenseCategories = categories;
            } catch(e) {
                this.loading = false;
                console.log("Unable to fetch expense categories", e);
            }
        },

        async validate(expense) {
            console.log("expense: ", expense);
            if (expense.categoryId === '' || expense.categoryId === "0") {
                this.validationErrors.categoryId = 'Expense Category is required'
            }

            if (expense.amount === '' || expense.amount === '0') {
                this.validationErrors.amount = 'Amount is required'
            } else if (isNaN(expense.amount)) {
                this.validationErrors.amount = 'Enter a valid amount'
            }

            if (expense.paymentMethod === '') {
                this.validationErrors.paymentMethod = 'Payment Method is required';
            }

            if (expense.expenseDate === '') {
                this.validationErrors.expenseDate = 'Expense Date is required';
            }

            if (expense.description === '') {
                this.validationErrors.description = 'Description is required';
            }
            console.log("this.validationErrors: ", this.validationErrors);
        },
        async clearValidationError(fieldKey) {
            await delete this.validationErrors[fieldKey];
        },
        async saveExpense(expense) {
            this.loading = true;
            try {
                const newExpense = await ExpenseService.saveExpenseRecord(expense);
                this.loading = false;
                return newExpense;
            } catch(e) {
                console.log("Unable to add expense", e);
                this.loading = false;
            }
        },
        async updateExpense(expense) {
            return await ExpenseService.updateExpenseRecord(expense);
        },
        async deleteExpense(expenseId) {
            return await ExpenseService.deleteExpense(expenseId);
        },
        async fetchExpenses() {
            await this.fetchExpenseCategories();
            const expenses = await ExpenseService.fetchAllExpenses();

            const categoryIdWiseCategories = {};
            this.expenseCategories.forEach((category) => {
                categoryIdWiseCategories[category.id] = category;
            })

            console.log("categoryIdWiseCategories: ", categoryIdWiseCategories);

            this.expenseList = expenses.map((expense) => {
                return {
                    ...expense,
                    category: categoryIdWiseCategories[expense.categoryId]
                }
            });
        },
        async fetchMonthlyExpenseReport() {
            try {
                this.loading = true;
                this.monthlyExpenses = await ExpenseService.fetchMonthlyExpenseReport();
                this.loading = false;
            } catch(e) {
                console.log("Unable to fetch monthly report", e);
                this.loading = false;
            }
        }
    }
});