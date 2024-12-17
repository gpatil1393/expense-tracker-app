<script setup>
import { watch } from 'vue';

const props = defineProps([
    "type",
    "name",
    "placeholder",
    "label",
    "min",
    "inputId", 
    "floatingLabel",
    "error",
    "fieldKey",
    "rows",
    "cols"
]);
const vModel = defineModel('vModel')
// const error = defineModel('error')

const emit = defineEmits(['clearError']);
const clearError = (fieldKey) => {
    // error.value = ''
    emit('clearError', fieldKey);
}


</script>
<template>

<div :class="floatingLabel ? 'form-floating mb-3' : 'mb3'">
    <input 
        v-if="type !== 'textarea'" 
        :type="type"
        :name="name" 
        :id="inputId"
        :placeholder="placeholder"
        :aria-invalid="error ? 'true' : 'false'"
        :min="min"
        @input="clearError(fieldKey)"
        :aria-label="label" 
        v-model="vModel" 
        class="form-control" 
    />
    <textarea 
        v-if="type === 'textarea'" 
        v-model="vModel" 
        :id="inputId" 
        :placeholder="placeholder" 
        :aria-invalid="error ? 'true' : 'false'" 
        :rows="rows"
        :cols="cols"
        @input="clearError(fieldKey)"
        class="form-control"></textarea>
    <label  v-if="label" :for="inputId" class="form-label">{{ label }}</label>
    <small v-if="error" class="error-text">{{ error }}</small>
</div>
</template>

<style scoped>
    .error-text {
        color: #FF0000;
    }
</style>