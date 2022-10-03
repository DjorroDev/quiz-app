<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";

function pante() {
  history.back();
}
</script>

<template>
  <el-container>
    <el-header>
      <TheNavbar />
    </el-header>
    <el-main>
      <el-page-header
        v-if="($route.name === 'quiz') | ($route.name === 'edit quiz')"
        :content="$route.name"
        @back="pante"
      />
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  /* padding: 0 100px 0 100px; */
  margin: auto;
  width: 100%;
  max-width: 1080px;
}
</style>
