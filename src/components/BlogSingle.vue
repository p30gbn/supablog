<template>
	<section class="section blog-wrap bg-gray">
		<div class="container">
			<div class="row">
				<div class="col-lg-8">
					<div class="row">
						<div class="col-lg-12 mb-5">
							<div class="single-blog-item">
								<img :src="blogPost.blogCoverPhotoURL" alt="" class="img-fluid rounded">

								<div class="blog-item-content bg-white p-5">
									<div class="blog-item-meta bg-gray py-1 px-2">
										<span class="text-muted text-capitalize mr-3"><i
												class="ti-pencil-alt mr-2"></i>Creativity</span>
										<span class="text-muted text-capitalize mr-3"><i
												class="ti-comment mr-2"></i>{{ commentsCount }} Comments</span>
										<span class="text-black text-capitalize mr-3"><i class="ti-time mr-2"></i> {{
											new Date(blogPost.created_at).toLocaleString("en-us") }}</span>
									</div>

									<h2 class="mt-3 mb-4"><router-link class="router-link"
											:to="{ name: 'ViewPost', params: { id: blogPost.id } }">{{ blogPost.blogTitle
											}}</router-link></h2>
									<p class="lead mb-4" v-html="blogPost.blogHTML">
									</p>
									<div class="tag-option mt-5 clearfix">
										<ul class="float-left list-inline">
											<li>Tags:</li>
											<li class="list-inline-item" v-for="tag in blogPost.tags"><a
													class="router-link" href="#" rel="tag">{{ tag }}</a></li>
										</ul>

										<ul class="float-right list-inline">
											<li class="list-inline-item"> Share: </li>
											<li class="list-inline-item"><a href="#" target="_blank"><i
														class="fab fa-facebook-f" aria-hidden="true"></i></a></li>
											<li class="list-inline-item"><a href="#" target="_blank"><i
														class="fab fa-twitter" aria-hidden="true"></i></a></li>
											<li class="list-inline-item"><a href="#" target="_blank"><i
														class="fab fa-pinterest-p" aria-hidden="true"></i></a></li>
											<li class="list-inline-item"><a href="#" target="_blank"><i
														class="fab fa-google-plus" aria-hidden="true"></i></a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>


						<div class="col-lg-12 mb-5">
							<div class="posts-nav bg-white p-5 d-lg-flex d-md-flex justify-content-between">
								<router-link v-if="previousPost" class="post-prev align-items-center router-link"
									:to="{ name: 'ViewPost', params: { id: previousPost.id } }">
									<div class="posts-prev-item mb-4 mb-lg-0">
										<span class="nav-posts-desc text-color">- Previous Post</span>
										<h6 class="nav-posts-title mt-1 router-link">
											{{ previousPost.blogTitle }}
										</h6>
									</div>
								</router-link>
								<div class="border mx-3"></div>
								<router-link v-if="nextPost" class="posts-next router-link"
									:to="{ name: 'ViewPost', params: { id: nextPost.id } }">
									<div class="posts-next-item pt-4 pt-lg-0">
										<span class="nav-posts-desc text-lg-right text-md-right text-color d-block">-
											Next Post</span>
										<h6 class="nav-posts-title mt-1 router-link">
											{{ nextPost.blogTitle }}
										</h6>
									</div>
								</router-link>
							</div>
						</div>

						<div class="col-lg-12 mb-5">
							<div class="comment-area card border-0 p-5">
								<h4 class="mb-4">{{ commentsCount }} Comments</h4>
								<ul class="comment-tree list-unstyled">
									<li class="mb-5" v-for="comment in blogPost.blogComments" :key="comment.id">
										<div class="comment-area-box">
											<!-- <img alt="" src="images/blog/test1.jpg" class="img-fluid float-left mr-3 mt-2"> -->

											<h5 class="mb-1">{{ comment.name }}</h5>
											<span>{{ comment.email }}</span>

											<div
												class="comment-meta mt-4 mt-lg-0 mt-md-0 float-lg-right float-md-right">
												<span class="date-comm">Posted {{ new
													Date(comment.created_at).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year:'numeric'})
													}} </span>
											</div>

											<div class="comment-content mt-3">
												<p>{{ comment.comment }}</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div class="col-lg-12">
							<form class="contact-form bg-white rounded p-5" id="comment-form">
								<h4 class="mb-4">Write a comment</h4>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<input class="form-control" v-model="name" type="text" name="name" id="name"
												placeholder="Name:">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<input class="form-control" v-model="email" type="text" name="mail"
												id="mail" placeholder="Email:">
										</div>
									</div>
								</div>


								<textarea class="form-control mb-3" v-model="comment" name="comment" id="comment"
									cols="30" rows="5" placeholder="Comment"></textarea>

								<input @click.prevent="sendComment" class="btn btn-main btn-round-full" type="submit"
									name="submit-contact" id="submit_contact" value="Submit Message">
							</form>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="sidebar-wrap">
						<div class="sidebar-widget search card p-4 mb-3 border-0">
							<form @submit.prevent="search">
								<input type="text" v-model="searchInput" class="form-control" placeholder="search">
								<button type="submit" class="btn btn-mian btn-small d-block mt-4">search</button>
							</form>
						</div>

						<div v-if="blogPost.profiles" class="sidebar-widget card border-0 mb-3">
							<img :src="blogPost.profiles?.userCoverPhotoURL" alt="User Cover Photo"
								class="img-fluid img-thumbnail">
							<div class="card-body p-4 text-center">
								<h5 class="mb-0 mt-4">{{ blogPost.profiles?.firstName }} {{ blogPost.profiles?.lastName }}
								</h5>
								<p>{{ blogPost.profiles?.userTitle }}</p>
								<p>{{ blogPost.profiles?.userBio }}</p>

								<ul class="list-inline author-socials">
									<li class="list-inline-item mr-3">
										<a href="#"><i class="fab fa-facebook-f text-muted"></i></a>
									</li>
									<li class="list-inline-item mr-3">
										<a href="#"><i class="fab fa-twitter text-muted"></i></a>
									</li>
									<li class="list-inline-item mr-3">
										<a href="#"><i class="fab fa-linkedin-in text-muted"></i></a>
									</li>
									<li class="list-inline-item mr-3">
										<a href="#"><i class="fab fa-pinterest text-muted"></i></a>
									</li>
									<li class="list-inline-item mr-3">
										<a href="#"><i class="fab fa-behance text-muted"></i></a>
									</li>
								</ul>
							</div>
						</div>

						<div class="sidebar-widget latest-post card border-0 p-4 mb-3">
							<h5>Latest Posts</h5>

							<div class="media border-bottom py-3" v-for="blogPost in lastPosts" :key="blogPost.id">
								<router-link class="router-link" :to="{ name: 'ViewPost', params: { id: blogPost.id } }"><img
										class="mr-4 lastPostsImg" :src="blogPost.blogCoverPhotoURL"
										alt=""></router-link>
								<div class="media-body">
									<h6 class="my-2"><router-link class="router-link"
											:to="{ name: 'ViewPost', params: { id: blogPost.id } }">{{ blogPost.blogTitle
											}}</router-link></h6>
									<span class="text-sm text-muted">{{ new
										Date(blogPost.created_at).toLocaleDateString("en-US", { day: 'numeric', month: 'long', year:'numeric'})
										}}</span>
								</div>
							</div>
						</div>

						<div class="sidebar-widget bg-white rounded tags p-4 mb-3">
							<h5 class="mb-4">Tags</h5>
							<a href="#" class="router-link" v-for="tag in blogPost.tags">{{ tag }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>



</template>

<script setup>
import { computed, ref } from 'vue';
import store from '../store/index';
import { useRoute, useRouter } from 'vue-router';
import supabase from '../supabase';
const route = useRoute()
const router = useRouter()
const name = ref("")
const email = ref("")
const comment = ref("")
const searchInput = ref("")



const blogPost = computed(() => { return store.state.blogPost })
const blogComments = computed(() => { return store.state.blogPost.blogComments || [] })
const lastPosts = computed(() => { return store.getters.getLastPosts })
const previousPost = computed(() => { return store.getters.getPreviousPost(route.params.id) })
const nextPost = computed(() => { return store.getters.getNextPost(route.params.id) })
const commentsCount = computed(() => {
	return blogComments.value.length
})



const sendComment = async () => {
	const { error } = await supabase.from("blogComments").insert({ name: name.value, email: email.value, comment: comment.value, blogPostID: route.params.id })
	name.value = ""
	email.value = ""
	comment.value = ""
	router.push({ name: "Home" })
}

const search = () => {
	router.push({
		name:"Search",
		query:{
			searchText:searchInput.value
		}
	})
}

</script>


<style>
.lastPostsImg {
	max-width: 150px;
}

.form-group {
	margin-bottom: 1rem;
}

.tags a {
	background-color: #f5f8f9;
	display: inline-block;
	padding: 8px 23px;
	border-radius: 38px;
	margin-bottom: 10px;
	border: 1px solid #eee;
	font-size: 14px;
	text-transform: capitalize;
}
</style>