import state from "./state"

export const getLastPosts = (state) => {
    return state.blogPosts.slice(0,3)
}

export const getPreviousPost = (state) => (postID) =>{
    const postIndex = state.blogPosts.findIndex((element)=>{
        return element.id == postID
    })
    return state.blogPosts[postIndex+1]
}

export const getNextPost = (state) => (postID) =>{
    const postIndex = state.blogPosts.findIndex((element)=>{
        return element.id == postID
    })
    return state.blogPosts[postIndex-1]
}

export const getBlogCommentsCount = (state) =>{
    return state.blogPost.blogComments.length
}

export const isAdmin = (state) =>{
    return state.user.user.user_metadata.isAdmin || false
}