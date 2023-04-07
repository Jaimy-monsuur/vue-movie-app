import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import store from '../store';
import SignUpView from "@/views/SignUpView.vue";
import MovieDetailsView from "@/views/MovieDetailsView.vue";
import AddReview from "@/views/AddReviewView.vue";
import AddReviewView from "@/views/AddReviewView.vue";
import EditReviewView from "@/views/EditReviewView.vue";
import CreateMovieView from "@/views/createMovieView.vue";
import EditMovieView from "@/views/EditMovieView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true, // add this meta field to protected routes
      },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpView,
    },
    {
      path: '/movie/:id',
      name: 'MovieDetails',
      component: MovieDetailsView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: '/movie/review/add/:id',
      name: 'AddReviewView',
      component: AddReviewView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
        path: '/movie/review/edit/:id',
        name: 'EditReviewView',
        component: EditReviewView,
        meta: { requiresAuth: true },
        props: true,
    },
    {
      path: '/movie/add/',
      name: 'CreateMovieView',
      component: CreateMovieView,
      meta: { requiresAuth: true , requiresAdmin: true},
    },
    {
      path: '/movie/edit/:id',
      name: 'EditMovieView',
      component: EditMovieView,
      meta: { requiresAuth: true , requiresAdmin: true},
      props: true,
    }
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !isLoggedIn) {
    next('/login');
  }
    //   if path does not exist
  else if (to.matched.length === 0) {
    next('/login');
    }
  // @ts-ignore
  else if (requiresAdmin && !(store.state.user.role === 'admin')) {
    next('/');
  }
  else {
    next();
  }
});

export default router;
