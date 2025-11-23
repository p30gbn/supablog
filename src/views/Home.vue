<template>
    <div>
        <Header />
        <Hero msg="Welcome To Supa Blog" />
        <BlogCards />
        <Footer />
    </div>
</template>

<script setup>
    import Header from "../components/Header.vue"
    import Hero from "../components/Hero.vue";
    import BlogCards from "../components/BlogCards.vue";
    import Footer from "../components/Footer.vue";
    import  {computed,onMounted} from "vue"
    import store from "../store/index"
    import supabase from "../supabase";

    onMounted(async()=>{
       store.dispatch("getBlogPosts")
       store.dispatch("getUser")

    })


</script>


<style>

</style>