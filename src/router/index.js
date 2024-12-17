import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import { useUserStore } from "@/stores/user.store";
import AuthLayout from "@/layout/AuthLayout.vue";
import HomeLayout from "@/layout/HomeLayout.vue";
import Logout from "@/views/Logout.vue";
import Register from "@/views/Register.vue";
import NewExpense from "@/views/NewExpense.vue";
import Expenses from "@/views/Expenses.vue";
import UpdateExpense from "@/views/UpdateExpense.vue";
import MonthlyExpenseReport from "@/views/MonthlyExpenseReport.vue";

function isLoggedIn() {
  const userStore = useUserStore();
  return userStore.isAuthenticated;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: AuthLayout,
      children: [{ path: "", component: Login }],
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next({ path: "/" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      component: AuthLayout,
      children: [{ path: "", component: Register }],
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next({ path: "/" });
        } else {
          next();
        }
      },
    },
    {
      path: "/logout",
      component: AuthLayout,
      children: [{ path: "", component: Logout }],
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      name: "home",
      component: HomeLayout,
      children: [
        {
          path: "",
          name: "ExpenseList",
          component: Expenses,
        },
        {
          path: "expense",
          name: "LogExpense",
          component: NewExpense,
        },
        {
          path: "expense/edit/:id",
          name: "EditExpense",
          component: UpdateExpense,
          props: true
        },
        {
          path: "report",
          name: "ExpenseReport",
          component: MonthlyExpenseReport,
        },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
