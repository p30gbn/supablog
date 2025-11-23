<template>
    <footer class="section footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-sm-6">
                    <div class="widget">
                        <h4 class="text-capitalize mb-4">supa blog</h4>
                        <ul class="list-unstyled footer-menu lh-35">
                            <li>
                                <router-link class="router-link" :to="{name:'Home'}">Home</router-link>
                            </li>
                            <li>
                                <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
                            </li>
                            <li>
                                <router-link class="router-link" :to="{name:'Signup'}">Register</router-link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>




</template>


<script setup>



</script>


<style>
    .footer{
        padding-bottom: 10px;
    }
    .widget{
        margin-bottom: 30px;
        padding-bottom: 35px;
    }
    .lh-35{
        line-height:35px
    }
    .list-unstyled{
        padding-left: 0;
        list-style: none;
    }




</style>