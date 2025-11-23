<template>
    <Header />
    <Hero msg="Edit Post" />
    <EditPost :blog-post="blogPost" />
    <Footer />
</template>


<script setup>
    import Header from '../components/Header.vue';
    import Hero from '../components/Hero.vue';
    import EditPost from '../components/EditPost.vue';
    import Footer from '../components/Footer.vue';
    import { onMounted,computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';

    const route = useRoute()
    const store = useStore()

    const blogPost = computed(()=>{return store.state.blogPost})

    onMounted(()=>{
        store.dispatch("getBlogPostForEdit",route.params.id)
    })

</script>


<style scoped>



</style>