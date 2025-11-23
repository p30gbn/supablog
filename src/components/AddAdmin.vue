<template>
    <section style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div v-show="!showEmailConfirm" class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 my-4">Add Admin</p>
                                    <div v-show="errorMsg" class="bg-danger text-white">
                                        <p class="text-capitalize">error: {{ errorMsg }}</p>
                                    </div>

                                    <form class="mx-1 mx-md-4" @submit.prevent="addAdmin">

                                        <div class="d-flex flex-row align-items-center my-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <b-form-file accept="image/*" required
                                                    v-model="userCoverPhoto" id="userCoverPhoto" ></b-form-file>
                                                <label class="form-label" for="userCoverPhoto">Profile Photo</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <input type="text" required v-model="firstName" id="fistName"
                                                    class="form-control" />
                                                <label class="form-label" for="fistName">First Name</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <input type="text" required v-model="lastName" id="lastName"
                                                    class="form-control" />
                                                <label class="form-label" for="lastName">Last Name</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <input type="email"  required v-model="email" id="email" class="form-control" />
                                                <label class="form-label" for="email">Email</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <input type="password" required v-model="password" id="password"
                                                    class="form-control" />
                                                <label class="form-label" for="password">Password</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <input type="text" required  v-model="userTitle" id="userTitle"
                                                    class="form-control" />
                                                <label class="form-label" for="userTitle">User Title</label>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <b-form-textarea v-model="userBio" required id="userBio" rows="3"></b-form-textarea>
                                                <label class="form-label" for="userBio">User Biography</label>
                                            </div>
                                        </div>

                                        <div class="form-check d-flex justify-content-center mb-5">
                                            <input class="form-check-input me-2" type="checkbox" v-model="terms"
                                                id="terms" />
                                            <label class="form-check-label" for="terms">
                                                I agree all statements in <a href="#!">Terms of service</a>
                                            </label>
                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                                class="btn btn-primary px-3">Add Admin User</button>
                                        </div>

                                    </form>



                                </div>
                                <div v-show="showEmailConfirm" class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-4  text-capitalize">
                                        confirmation Email sended to User email,please check email...</p>
                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

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
import supabase from '../supabase';
import { ref } from 'vue';
import { BFormFile,BFormTextarea } from "bootstrap-vue-next"

const userCoverPhoto = ref("")
const userCoverPhotoURL = ref("")
const email = ref("")
const password = ref("")
const firstName = ref("")
const lastName = ref("")
const showEmailConfirm = ref(false)
const terms = ref(false)
const errorMsg = ref("")
const userTitle = ref("")
const userBio = ref("")


const addAdmin = async () => {
    errorMsg.value = ""
    if (email.value && password.value && firstName.value && lastName.value) {
        if (password.value.length > 5) {
            if (terms.value) {
                const { data, error } = await supabase.storage.from("documents").upload(`userCoverPhotos/${userCoverPhoto.value.name}`, userCoverPhoto.value, {
                    cacheControl: "3600",
                    upsert: false
                })
                if (error) {
                    errorMsg.value = error
                    return;
                }
                userCoverPhotoURL.value = `https://hrournkzecyrlxpzkvgl.supabase.co/storage/v1/object/public/${data.fullPath}`
                console.log(userCoverPhotoURL)
                const { data:auth, error:authError } = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                    options: {
                        data: {
                            email: email.value,
                            firstName: firstName.value,
                            lastName: lastName.value,
                            isAdmin: true,
                            userTitle: userTitle.value,
                            userBio: userBio.value,
                            userCoverPhotoURL: userCoverPhotoURL.value
                        }
                    }
                })
                if (authError) {
                    errorMsg.value = authError
                    return;
                } else {
                    const { error:profileError } = await supabase.from("profiles").insert({
                        id: auth.user.id,
                        email: email.value,
                        firstName: firstName.value,
                        lastName: lastName.value,
                        isAdmin: true,
                        userCoverPhotoURL:userCoverPhotoURL.value,
                        userTitle: userTitle.value,
                        userBio: userBio.value,
                    })
                    if (profileError) {
                        errorMsg.value = profileError
                        return;
                    }
                    showEmailConfirm.value=!showEmailConfirm.value
                }

            } else {
                errorMsg.value = "Please Fill The CheckBox"
                return;
            }

        } else {
            errorMsg.value = "Password Must be Minumum 6 Character"
            return;
        }
    } else {
        errorMsg.value = "Please Fill All Inputs"
        return;
    }

}

</script>


<style scoped></style>