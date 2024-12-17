<script setup></script>
<template>
  <div class="d-flex justify-content-center loader">
    <div class="spinner spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: #efefef;
  z-index: 1000;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -25px;
  text-align: center;
}
</style>
