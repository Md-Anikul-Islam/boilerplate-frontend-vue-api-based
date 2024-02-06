import {createRouter,createWebHistory} from "vue-router";
import AdminDashboard from "@/views/pages/AdminDashboard";
import BlogInformation from "@/views/pages/BlogInformation";
import LoginPage from "@/views/auth/LoginPage";
import RegisterPage from "@/views/auth/RegisterPage";
import store from "@/store";
import FotgotPassword from "@/views/auth/password/FotgotPassword";
import ResetPassword from "@/views/auth/password/ResetPassword"

const routes = [
    {
        path:'/',
        name : LoginPage,
        component: LoginPage,
        meta: { guest: true },
    },
    {
        path:'/register',
        name : RegisterPage,
        component: RegisterPage,
        meta: { guest: true },
    },
    {
        path:'/forgot-password',
        name : FotgotPassword,
        component: FotgotPassword,
        meta: { guest: true },
    },

    {
        path:'/reset-password',
        name : ResetPassword,
        component: ResetPassword,
        meta: { guest: true },
    },

    {
        path:'/dashboard',
        name : AdminDashboard,
        component: AdminDashboard,
        meta: { requiresAuth: true },
    },

    {
        path:'/blog',
        name : BlogInformation,
        component: BlogInformation,
        meta: { requiresAuth: true },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.GET_AUTH_STATUS) {
            next({
                path: '/',
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.GET_AUTH_STATUS) {
            next({
                path: '/dashboard',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;