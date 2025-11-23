<template>
    <div class="col-lg-6 col-md-6 mb-5">
        <div class="blog-item">
            <img :src="props.blogPost.blogCoverPhotoURL" alt="" class="img-fluid rounded card-image">
            <div v-show="togglePostAdmin" class="card-icon">
                <router-link :to="{ name: 'EditPost', params: { id: props.blogPost.id } }" class="post-admin-links">
                    <i class="ti-write mr-2"></i>Edit</router-link>
            </div>
            <div v-show="togglePostAdmin" class="card-icon" style="margin-right: 5rem;">
                <a href="" @click.prevent="confirmDeletePost" class="post-admin-links">
                    <i class="ti-eraser mr-1"></i>
                    Delete
                </a>
            </div>
            <div class="blog-item-content bg-white p-5">
                <div class="blog-item-meta bg-gray py-1 px-2">
                    <span class="text-muted text-capitalize mr-3"><i class="ti-pencil-alt mr-2"></i>Creativity</span>
                    <span class="text-muted text-capitalize mr-3"><i class="ti-comment mr-2"></i>{{ commentsCount }}
                        Comments</span>
                    <span class="text-muted text-capitalize mr-3"><i class="ti-time mr-2"></i>{{ new
                        Date(props.blogPost.created_at).toLocaleString("en-us") }}</span>
                </div>

                <h3 class="my-3">
                    <router-link :to="{ name: 'ViewPost', params: { id: props.blogPost.id } }" class="blogTitle">{{
                        props.blogPost.blogTitle }}</router-link>
                </h3>
                <p class="mb-4 blogHTML text-truncate" v-html="props.blogPost.blogHTML"></p>

                <router-link :to="{ name: 'ViewPost', params: { id: props.blogPost.id } }"
                    class="btn btn-small btn-main btn-round-full">Read More</router-link>
            </div>
        </div>
    </div>
<b-modal v-model="confirmDeletePostModal" @ok="deletePost" ok-title="Yes" cancel-title="No" button-size="sm" ok-variant="danger" title="Delete Post Confirmation">
    <p>Are You Sure About Delete This Post ?</p>
</b-modal>

</template>


<script setup>
import { ref, defineProps, computed } from "vue"
import { BModal } from "bootstrap-vue-next"
import supabase from "../supabase"
import { useRouter } from "vue-router"

const props = defineProps(["blogPost", "togglePostAdmin"])
const router = useRouter()

const commentsCount = computed(() => {
    return props.blogPost.blogComments.length
})

const confirmDeletePostModal = ref(false)

const confirmDeletePost = () => {
    confirmDeletePostModal.value = !confirmDeletePostModal.value
}

const deletePost = async () => {
    const response = await supabase.from("blogPosts").delete().eq("id",props.blogPost.id)
    router.go(0)
}


</script>

<style scoped>
.blog-item {
    position: relative;
}

.card-icon {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
}

.post-admin-links {
    color: #fff;
    text-decoration: none;
}

.post-admin-links:hover {
    color: #f75757 !important;
    text-decoration: none;

}
</style>