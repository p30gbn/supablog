<template>
  <router-view></router-view>
</template>



<script setup>
 
 </script>



<style>
  .btn{
    display:inline-block;
    font-size: 14px;
    font-weight: 400;
    padding: 1rem 2.5rem;
    text-transform: uppercase;
    border-radius: 0;
    transition: all 0.2s ease;
  }
  .btn-solid-border{
    background-color: transparent;
    color: #242424;
    border: 2px solid #f75757;
  }
  .btn-round-full{
    border-radius: 50px !important;
  }
  .btn-solid-border:hover{
    border: 2px solid #f75757;
    background-color: #f75757;
  }
  section,.section{
    display: block;
    padding: 100px 0;
  }
  .text-lg{
    font-size:3.75rem
  }
  h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  font-family: "Poppins", sans-serif!important;
  font-weight: 600 !important;
  color: #242424!important;
}
.bg-gray{
  background-color: #f5f8f9;
}
.text-black{
  color:#242424;
}
p{
  line-height: 30px;
}
.btn-main, .btn-transparent, .btn-small{
  background:#f75757 !important;
  color:#fff!important;
}
.btn-small{
  padding:10px 25px !important;
  font-size:12px !important

}
.btn-main:hover, .btn-transparent:hover, .btn-small:hover {
  background: #dd0b0b!important;
  color: #fff!important;
}
h4,.h4{
  font-size:1.3rem!important;
  line-height:38px!important;
}
.router-link{
  color:#242424!important;
  text-decoration:none!important;
}
.router-link:focus,.router-link:hover{
  color:#f75757!important;
  text-decoration:none!important;
}
.mr-2{
  margin-right:0.5rem!important;
}
</style>
