import { createRouter, createWebHistory } from 'vue-router'
import ItemsView from '../views/ItemsView.vue'
import ItemView from '../views/ItemView.vue'
import LoginView from '../views/LoginView.vue'
import CreateContainerView from '../views/CreateContainer.vue'
import BinsView from '../views/BinsView.vue'
import ItemsByBinView from '../views/ItemsByBinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ItemsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/item/:id',
    name: 'item',
    component: ItemView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/createcontainer',
    name: 'createcontainer',
    component: CreateContainerView,
    meta: {requiresAuth: true}
  },
  {
    path: '/bins',
    name: 'bins',
    component: BinsView
  },
  {
    path: '/itemsbybin/:id',
    name: 'itemsbybinnumber',
    component: ItemsByBinView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (window.$cookies.get("authToken") == null) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
