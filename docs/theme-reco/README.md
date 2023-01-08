---
title: theme-reco
date: 2020-05-29
---

This is theme-reco.

<template>
<web-site msg="hello word"></web-site>

<div class="ppp" v-for="item in list" :key="item._id">{{item.name}}</div>
<button @click="handleClick">点击</button>
</template>

<script>
import axios from 'axios';
import WebSite from "../../.vuepress/components/webSite";
export default {
    components: {WebSite},
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        list:[]
      }
    },
    created() {
         
    },
    methods: {
      handleClick() {
        axios.get('https://fc-mp-658bcd09-92b6-4dcc-af92-01d5099c282e.next.bspapp.com/getList/handleGetRemark?unionid=oERK55jGiZ-S2gZYCLnov3wseBbE').then(res => {
          this.list = res.data.data;
        })
      }
    }
}
</script>

<style spoced>
.ppp {
  color: red;
}
</style>
