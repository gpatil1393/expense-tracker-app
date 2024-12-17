<script setup>
import InputWithError from '@/components/InputWithError.vue';
import { useExpenseStore } from '@/stores/expense.store';
import { ref } from 'vue';
const expenseStore = useExpenseStore();

const emit = defineEmits(['filterRecords', 'clearFilter'])

const filters = ref({
    categoryId: null,
    expenseStartDate: null,
    expenseEndDate: null
})
const onFilter = () => {
    emit('filterRecords', filters.value);
}

const clearFilter = () => {
    filters.value = {
        categoryId: null,
        expenseStartDate: null,
        expenseEndDate: null,
    }
    emit('clearFilter');
}
</script>
<template>
    <form @submit.prevent="onFilter">
        <div class="card border-primary mb-9">
            <div class="card-header">
                <h5 class="card-title">Filter Expense</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-floating mb-3">
                            <select class="form-select" id="expenceCategory" 
                                aria-label="Expense Categories" v-model="filters.categoryId">
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
                            :type="'date'"
                            :inputId="'expenseStartDate'"
                            :placeholder="'From'"
                            :label="'Expense Date Start'"
                            :name="'expenseStartDate'"
                            :error="expenseStore.validationErrors.expenseStartDate"
                            :floatingLabel="true"
                            fieldKey="'expenseStartDate'"
                            v-model:vModel="filters.expenseStartDate"
                        />
                    </div>
                    <div class="col">
                        <InputWithError
                            :type="'date'"
                            :inputId="'expenseEndDate'"
                            :placeholder="'To'"
                            :label="'Expense Date End'"
                            :name="'expenseEndDate'"
                            :error="expenseStore.validationErrors.expenseEndDate"
                            :floatingLabel="true"
                            fieldKey="'expenseEndDate'"
                            v-model:vModel="filters.expenseEndDate"
                        />
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-primary" @click="clearFilter">Reset</button>&nbsp;
                <button type="submit" class="btn btn-success">Filter</button>
            </div>
        </div>
    </form>
</template>
<style scoped>
.card-footer {
    text-align: right;
}
</style>