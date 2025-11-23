<template>
    <section class="section blog-wrap bg-gray">
        <div class="container">
            <div class="row">
                <div v-if="user.user" class="flex justify-between">
                    <div class="flex flex-row">
                        <form @submit.prevent="search" >
                            <input type="text" required v-model="searchInput" id="search" placeholder="Search..." class="bg-zinc-300 px-6 py-2 rounded-md border
                             border-zinc-600 focus:outline-0 text-zinc-800 placeholder:text-zinc-600 placeholder:text-light"
                             >
                             <button type="submit" class="margin-left-6 py-2 px-6 bg-zinc-300 rounded-lg" >Search</button>
                        </form>
                    </div>
                    <div v-if="user.user.user_metadata?.isAdmin"
                        class="mb-5 d-flex justify-content-end align-items-center">
                        <span class="text-capitalize mx-3">toggle post admin</span>
                        <b-form-checkbox switch size="lg" v-model="togglePostAdmin"></b-form-checkbox>
                    </div>
                    
                </div>
                <blogCard v-for="blogPost in blogPosts.slice((currentPage - 1) * perPage, currentPage * perPage)"
                    :key="blogPost.id" :blog-post="blogPost" :toggle-post-admin="togglePostAdmin" />
                <BPagination v-if="blogPosts" class="mt-5" v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center">
                </BPagination>
            </div>
        </div>
    </section>
</template>

<script setup>
import store from "../store/index"
import { ref, computed } from "vue"
import BlogCard from "./BlogCard.vue"
import { BFormCheckbox, BPagination } from "bootstrap-vue-next"
import { useRouter } from "vue-router"

const currentPage = ref(1)
const togglePostAdmin = ref(false)
const perPage = ref(8)
const router = useRouter()
const searchInput = ref("")


const blogPosts = computed(() => { return store.state.blogPosts })
const user = computed(() => { return store.state.user })
const rows = computed(() => { return blogPosts.value.length })


const search = () =>{
    router.push({name:"Search",
    query:{
        searchText:searchInput.value
    }})
}

</script>

<style>
.margin-left-6{
    margin-left: 1rem !important;
}
.blog-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    height: 750px;
}

.mr-3 {
    margin-right: 1rem;
}

.blog-item-content h3 {
    line-height: 36px;
}

.blog-item-content h3 .blogTitle {
    color: #242424;
    text-decoration: none;
    transition: all .4s ease 0s;
}

.blogHTML {
    max-height: 120px;
    overflow: hidden;
}
</style>