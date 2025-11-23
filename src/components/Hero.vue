<template>
<div class="main-wrapper">
    <section class="page-title bg-1">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="block text-center">
                        <h1 class="text-capitalize mb-4 text-lg">{{ props.msg }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>


</template>


<script setup>
import { defineProps } from 'vue';
const props = defineProps(["msg"])


</script>


<style scoped>
    .bg-1{
        background: url("../../public/home-2.jpg") no-repeat 50% 50%;
        background-size: cover;
    }
    .page-title{
        padding: 100px 0;
        position: relative;
    }
    .page-title .block h1{
        color: #fff!important;
    }
    

</style>