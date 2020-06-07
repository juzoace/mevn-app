<template>
  <div id="app">
    <Navbar/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view/> -->
    <div class="container">
      <Errors v-if="error" :msg="error" />
      <br><br>
      <router-view/>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex';
import Navbar from "@/components/Navbar";
import Errors from "@/components/Errors";
export default {
  components: {
    Navbar,
    Errors
  },
  computed: {
    ...mapGetters(['error'])
  }
}
</script>

<style>

.card {
  border-radius: 0px;
}
</style>
