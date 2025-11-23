<template>
    <section style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row d-flex justify-content-center">
                                <div v-show="!showCreatedPost" class="col-md-12">

                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">Create Post</p>
                                    <div v-show="errorMsg" class="bg-danger text-white">
                                        <p class="text-capitalize">error: {{ errorMsg }}</p>
                                    </div>

                                    <form class="" @submit.prevent="createPost">
                                        <div class="container my-5">
                                            <div class="row">
                                                <div class="col-lg-5" style="margin-right: 1.5rem;">
                                                    <b-form-input required v-model="blogTitle"
                                                        placeholder="Blog Post Title"></b-form-input>
                                                </div>
                                                <div class="col-lg-5">
                                                    <b-form-file required v-model="blogCoverPhoto" accept="image/*"></b-form-file>
                                                </div>
                                                <div class="col-lg-10 my-5">
                                                    <quill-editor :modules="modules" v-model:content="blogHTML" content-type="html" toolbar="full" theme="snow" ></quill-editor>
                                                </div>
                                                <div class="col-lg-3 my-5" >
                                                     <b-form-input placeholder="Blog Post Tags" v-model="tags" ></b-form-input>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                    <b-button variant="outline-danger" type="submit">Create Post</b-button>
                                            </div>
                                        </div>





                                    </form>



                                </div>
                                <div v-show="showCreatedPost" class="col-md-6">
                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4  text-capitalize">
                                        Your New post is created...</p>
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
import { BFormInput, BFormFile,BButton } from 'bootstrap-vue-next';
import { QuillEditor } from '@vueup/vue-quill';
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import { ref,computed } from 'vue';
import supabase from '../supabase';
import BlotFormatter from 'quill-blot-formatter';
import store from '../store';


const blogTitle=ref("")
const blogCoverPhoto=ref({})
const blogHTML = ref("")
const tags = ref("")
const errorMsg = ref("")
const blogCoverPhotoURL = ref("")
const blogCoverPhotoName=ref("")
const showCreatedPost = ref(false)

const user = computed(() => { return store.state.user })
const profileID = computed(()=>{
    return user.value.user.id
})

const modules = [
    {
        name:"blotFormatter",
        module:BlotFormatter,
        options:{}
    }
]




const createPost = async() =>{
    const {data,error} = await supabase.storage.from("documents").upload(`blogCoverPhotos/${blogCoverPhoto.value.name}`,blogCoverPhoto.value,{
        cacheControl:"3600",
        upsert:true
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
     tags.value = tags.value.split(',')

    const {error:insertError} = await supabase.from("blogPosts").insert({
        blogTitle:blogTitle.value,
        blogHTML:blogHTML.value,
        blogCoverPhotoName:blogCoverPhotoName.value,
        blogCoverPhotoURL:blogCoverPhotoURL.value,
        tags:tags.value,
        profileID:profileID.value
    })

    if(insertError){
        errorMsg.value=insertError
        setTimeout(()=>{
            errorMsg.value=""
        },20*1000)
        return;
    } else{
        showCreatedPost.value=!showCreatedPost.value
    }

}
</script>


<style scoped></style>