<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Expense Tracker | </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="expense" class="nav-link" active-class="active">Add Expense</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="report" class="nav-link" active-class="active">Expense Report</RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav justify-content-end">
            <li class="nav-item">
              <RouterLink to="logout" class="nav-link" active-class="active">Logout</RouterLink>
            </li>
            <!-- li class="nav-item">
              <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" 
                  class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" 
                  aria-expanded="false">
                  Hello
                </button>
                <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <RouterLink to="logout" class="nav-link" active-class="active">Logout</RouterLink>
                  </li>
                </ul>
              </div>
            </li -->
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
