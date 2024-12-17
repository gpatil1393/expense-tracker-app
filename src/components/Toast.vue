<script setup>
import { defineProps } from 'vue';
const props = defineProps(['toastMessage', 'elementRef']);
</script>
<template>
    <div class="toast-container position-absolute top-0 end-0 p-3" id="toastPlacement">
    <div class="toast align-items-center text-white bg-primary border-0" role="alert" 
        aria-live="assertive" aria-atomic="true" :ref="elementRef">
    <div class="d-flex">
        <div class="toast-body">
            {{ toastMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    </div>
    </div>
</template>
<style scoped></style>