<template>
    <Header />
    <Hero msg="Search" />
    <Search :searchText="searchText" />
    <Footer />


</template>


<script setup>
    import Header from '../components/Header.vue';
    import Hero from '../components/Hero.vue';
    import Footer from '../components/Footer.vue';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import Search from '../components/Search.vue';

    const route = useRoute()
    const searchText = ref(route.query.searchText)

</script>


<style scoped>



</style>