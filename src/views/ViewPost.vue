<template>
    <Header />
    <Hero :msg="blogPost.blogTitle" />
    <BlogSingle />
    <Footer />


</template>

<script setup>
    import Header from "../components/Header.vue"
    import Hero from "../components/Hero.vue";
    import BlogSingle from "../components/BlogSingle.vue";
    import Footer from "../components/Footer.vue"
    import store from "../store/index";
    import { onMounted ,watch,computed} from "vue";
    import { useRoute } from "vue-router";
    const route = useRoute()

    const blogPost = computed(()=>{return store.state.blogPost})


    onMounted(()=>{
        store.dispatch("getBlogPost",route.params.id)
        store.dispatch("getBlogPosts")
    })
    watch(route,()=>{
        store.dispatch("getBlogPost",route.params.id)
    })

</script>


<style>



</style>