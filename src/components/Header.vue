<template>
    <header class="navigation">
        <nav class="navbar navbar-expand-lg  py-4" id="navbar">
            <div class="container d-flex justify-content-between">
                <router-link class="navbar-brand" :to="{name:'Home'}">
                    Supa<span>Blog.</span>
                </router-link>
                <div class="collapse navbar-collapse text-center" id="navbarsExample09">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="#">Blog</router-link>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="project.html">Portfolio</a></li>
                        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    </ul>

                    <form v-if="!user.user" class="form-lg-inline my-2 my-md-0 ml-lg-4 text-center">
                        <router-link :to="{ name: 'Signup' }" class="btn btn-solid-border btn-round-full">Login /
                            Register</router-link>
                    </form>
                    <div v-if="user.user" class="d-flex">
                        
                        <b-dropdown class="text-capitalize mx-4" split :text="user.user.user_metadata.firstName" variant="outline-danger">
                            <b-dropdown-header>
                                <b-avatar  class="mr-2" variant="danger" />
                                {{ user.user.user_metadata.email }}</b-dropdown-header>
                            <b-dropdown-item :to="{name:'EditProfile'}">edit profile</b-dropdown-item>
                            <b-dropdown-item v-if="user.user.user_metadata.isAdmin" :to="{name:'CreatePost'}">Create Post</b-dropdown-item>
                            <b-dropdown-item v-if="user.user.user_metadata.isAdmin" :to="{name:'AddAdmin'}">Add Admin</b-dropdown-item>
                            <b-dropdown-item to="#" @click="signOut">Sign Out</b-dropdown-item>
                        </b-dropdown>
                    </div>

                </div>
            </div>
        </nav>
    </header>

</template>

<script setup>
import store from '../store';
import { computed } from 'vue';
import { BAvatar, BDropdown, BDropdownItem,BDropdownHeader } from "bootstrap-vue-next"

const user = computed(() => {
    return store.state.user
})

const signOut = () => {
    store.dispatch("signOut")
}


</script>

<style scoped>
#navbar {
    background-color: #222328;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.navbar-brand {
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
}

.navbar-brand span {
    color: #f75757;
}

#navbar li {
    padding-left: 15px;
}

#navbarsExample09 {
    justify-content: flex-end;
}

#navbar li a {
    color: #fff;
}

#navbar .nav-link:hover,
#navbar .nav-link:focus {
    color: #f75757;
}

#navbar .btn {
    color: #fff;
    padding: 0.5rem 1.5rem;
    margin-left: 32px;
}

.btn {
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    padding: 1rem 2.5rem;
    text-transform: uppercase;
    border-radius: 0;
    transition: all 0.2s ease;
}

.btn-solid-border {
    background-color: transparent;
    color: #242424;
    border: 2px solid #f75757;
}

.btn-round-full {
    border-radius: 50px;
}

.btn-solid-border:hover {
    border: 2px solid #f75757;
    background-color: #f75757;
}
</style>