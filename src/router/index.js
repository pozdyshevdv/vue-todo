import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from "../components/Authorize";
import ToDoList from "../components/ToDoList";
import Reg from "../components/Reg"
import Logout from "../components/Logout";

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: '/todolist',
            name: 'todolist',
            component: ToDoList
        },
        {
            path: '/login',
            name: 'auth',
            component: Authorize
        },
        {
            path: '/reg',
            name: 'reg',
            component: Reg
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
    ]
})

export default router;