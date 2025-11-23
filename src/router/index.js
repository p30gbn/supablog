import {createRouter,createWebHistory} from "vue-router"

import Home from "../views/Home.vue"
import ViewPost from "../views/ViewPost.vue"
import Signup from "../views/Signup.vue"
import Login from "../views/Login.vue"
import EditProfile from "../views/EditProfile.vue"
import CreatePost from "../views/CreatePost.vue"
import EditPost from "../views/EditPost.vue"
import AddAdmin from "../views/AddAdmin.vue"
import Search from "../views/Search.vue"



const routes = [
    {
    path:"/",
    name:"Home",
    component:Home,
    meta:{title:"Supa Blog"}
    },
    {
    path:"/view-post/:id",
    name:"ViewPost",
    component:ViewPost,
    meta:{title:"View Post"}
    },
    {
    path:"/signup",
    name:"Signup",
    component:Signup,
    meta:{title:"Signup"}
    },
    {
        path:"/login",
        name:"Login",
        component:Login,
        meta:{title:"Login"}
    },
    {
        path:"/edit-profile",
        name:"EditProfile",
        component:EditProfile,
        meta:{title:"Edit Profile"}
    },
    {
        path:"/create-post",
        name:"CreatePost",
        component:CreatePost,
        meta:{title:"Create Post"}
    },
    {
        path:"/edit-post/:id",
        name:"EditPost",
        component:EditPost,
        meta:{title:"Edit Post"}
    },
    {
        path:"/add-admin",
        name:"AddAdmin",
        component:AddAdmin,
        meta:{title:"Add Admin"}
    },
    {
        path:"/search",
        name:"Search",
        component:Search,
        meta:{title:"Search"}
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

router.beforeEach((to,from)=>{
    document.title = to.meta.title || "Supa Blog"
})

export default router