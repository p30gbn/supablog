<template>
    <section style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row">
                                <div v-show="!showEditedPost" class="col-md-12">

                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">Edit Post</p>
                                    <div v-show="errorMsg" class="bg-danger text-white">
                                        <p class="text-capitalize">error: {{ errorMsg }}</p>
                                    </div>

                                    <form class="" @submit.prevent="editPost">
                                        <div class="container my-5">
                                            <div class="row">
                                                <div class="col-lg-5" style="margin-right: 1.5rem;">
                                                    <b-form-input required v-model="props.blogPost.blogTitle"
                                                        placeholder="Blog Post Title"></b-form-input>
                                                </div>
                                                <div class="col-lg-5">
                                                    <b-form-file v-model="blogCoverPhoto" accept="image/*"></b-form-file>
                                                </div>
                                                <div class="col-lg-10 my-5">
                                                    <quill-editor :modules="modules" v-model:content="props.blogPost.blogHTML" content-type="html" toolbar="full" theme="snow" ></quill-editor>
                                                </div>
                                                <div class="col-lg-3 my-5" >
                                                     <b-form-input placeholder="Blog Post Tags" v-model="props.blogPost.tags" ></b-form-input>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                    <b-button variant="outline-danger" type="submit">Edit Post</b-button>
                                            </div>
                                        </div>





                                    </form>



                                </div>
                                <div v-show="showEditedPost" class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4  text-capitalize">
                                        Your  post is Edited...</p>
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
    import { ref,defineProps } from 'vue';
    import {BFormInput, BFormFile,BButton} from "bootstrap-vue-next"
    import { QuillEditor } from '@vueup/vue-quill';
    import "@vueup/vue-quill/dist/vue-quill.snow.css"
    import BlotFormatter from 'quill-blot-formatter';
    import supabase from '../supabase';
    import { useRoute } from 'vue-router';

    const showEditedPost = ref(false)
    const blogCoverPhoto = ref("")
    const blogCoverPhotoName = ref("")
    const blogCoverPhotoURL = ref("")
    const errorMsg = ref("")
    const route = useRoute()
    const props = defineProps(["blogPost"])
    const modules = [
        {
            name:"blotFormatter",
            module:BlotFormatter,
            options:{}
        }
    ]


    const editPost = async() => {
        console.log(props.blogPost.tags.split(","))
        if(blogCoverPhoto.value){
            const {data,error} = await supabase.storage.from("documents").upload(`blogCoverPhotos/${blogCoverPhoto.value.name}`,blogCoverPhoto.value,{
                cacheControl:"3600",
                upsert:false
            })
            if(error){
                errorMsg.value=error
                setTimeout(()=>{
                    errorMsg.value=""
                },20*1000)
                return;
            }
            blogCoverPhotoName.value = blogCoverPhoto.value.name
            blogCoverPhotoURL.value = `https://hrournkzecyrlxpzkvgl.supabase.co/storage/v1/object/public/${data.fullPath}`
            const {err} = await supabase.from("blogPosts").update({
                blogTitle:props.blogPost.blogTitle,
                blogHTML:props.blogPost.blogHTML,
                tags:props.blogPost.tags.split(","),
                blogCoverPhotoName:blogCoverPhotoName.value,
                blogCoverPhotoURL:blogCoverPhotoURL.value
            }).eq("id",route.params.id)
            if(err){
                errorMsg.value=err
                setTimeout(()=>{
                    errorMsg.value=""
                },20*1000)
                return;
            } else{
                showEditedPost.value=!showEditedPost.value
            }
        } else {
            const {err} = await supabase.from("blogPosts").update({
                blogTitle:props.blogPost.blogTitle,
                blogHTML:props.blogPost.blogHTML,
                tags:props.blogPost.tags.split(",")
            }).eq("id",route.params.id)
            if(err){
                errorMsg.value=err
                setTimeout(()=>{
                    errorMsg.value=""
                },20*1000)
                return;
            } else {
                showEditedPost.value=!showEditedPost.value
            }
        }
    }

</script>


<style scoped>



</style>