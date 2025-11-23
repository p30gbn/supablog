import supabase from "../supabase";
import router from "../router/index"


export const getBlogPosts = async ({ commit }) => {
  const { data, error } = await supabase.from("blogPosts").select("*,blogComments(*)").order("id",{ascending: false});
  commit("setBlogPosts",data)
};

export const getBlogPost = async({commit},blogPostID) =>{
  const {data,error} = await supabase.from("blogPosts").select("*,blogComments(*),profiles(*)").eq("id",blogPostID)
  commit("setBlogPost",data)
}

export const getBlogPostForEdit = async({commit},blogPostID) =>{
  const {data,error} = await supabase.from("blogPosts").select("*").eq("id",blogPostID)
  commit("setBlogPostForEdit",data)
}

export const loginUser = async({commit},{email,password}) => {
  const {data,error} = await supabase.auth.signInWithPassword({
    email:email,
    password:password
  })
  if(!error){
    commit("setUser",data)
    router.push({name:"Home"})
  }
  
}

export const getUser = async({commit}) => {
  const {data,error} = await supabase.auth.getUser()
  commit("setUser",data)
}

export const signOut = async({commit}) => {
  const {error} = await supabase.auth.signOut()
  commit("setUser",{})

}