import state from "./state"

export const setBlogPosts = (state,data) => {
    state.blogPosts = data
}

export const setBlogPost = (state,data) =>{
    state.blogPost = data[0]
}

export const setBlogPostForEdit = (state,data) =>{
    state.blogPost.id = data[0].id
    state.blogPost.blogTitle = data[0].blogTitle
    state.blogPost.blogHTML = data[0].blogHTML
    state.blogPost.tags = data[0].tags.join(",")
    state.blogPost.blogCoverPhotoName = data[0].blogCoverPhotoName
    state.blogPost.blogCoverPhotoURL = data[0].blogCoverPhotoURL
    state.blogPost.created_at = data[0].created_at

}

export const setUser = (state,data) => {
    state.user = data
}


export const updateFirstName = (state,value) => {
    state.user.user.user_metadata.firstName = value
}

export const updateLastName = (state,value) => {
    state.user.user.user_metadata.lastName = value
}