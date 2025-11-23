<template>

    <section style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-12">
                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">Search For {{
                                        props.searchText }}</p>
                                    <div class="searchData">
                                        <div v-if="searchData.length==0" class="mx-auto font-black-300 text-2xl my-24 text-center">
                                             Sorry !!! , No Result Finded For {{props.searchText}}!!! 
                                        </div>
                                        <div v-else class="col-md-11 d-flex my-5" v-for="search in searchData"
                                            :key="search.id">
                                            <div class="search_left mx-4">
                                                <img :src="search.blogCoverPhotoURL" alt="" style="max-width: 250px;">
                                            </div>
                                            <div class="search_right">
                                                <h5><router-link :to="{ name: 'ViewPost', params: { id: search.id } }"
                                                        class="router-link">{{ search.blogTitle }}</router-link></h5>
                                                <div class="blog-item-meta bg-gray py-1 px-2">
                                                    <span class="text-muted text-capitalize mr-3"><i
                                                            class="ti-pencil-alt mr-2"></i>Creativity</span>
                                                    <span class="text-muted text-capitalize mr-3"><i
                                                            class="ti-comment mr-2"></i>{{ search.blogComments.length }}
                                                        Comments</span>
                                                    <span class="text-muted text-capitalize mr-3"><i
                                                            class="ti-time mr-2"></i>{{ new
                                                                Date(search.created_at).toLocaleString("en-us")
                                                        }}</span>
                                                </div>
                                                <p class="text-truncate" style="max-width: 600px;display: block;">{{
                                                    search.blogHTML }}</p>
                                            </div>
                                        </div>



                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



</template>


<script setup>
import { defineProps, onMounted } from 'vue';
import supabase from '../supabase';
import { ref } from 'vue';


const props = defineProps({
    searchText: {
        type: String,
        required: true
    }
})

const searchData = ref([])

onMounted(async () => {
    const { data, error } = await supabase.from("blogPosts").select("*,blogComments(*)").textSearch("blogTitle,blogHTML", props.searchText).order("created_at", { ascending: false })
    searchData.value = data
})

</script>


<style scoped></style>