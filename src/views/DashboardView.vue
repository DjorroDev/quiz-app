<script setup>
import { ref } from "vue";
import TheWelcome from "../components/TheWelcome.vue";
import CreateView from "./CreateView.vue";

const activeName = ref("first");
</script>

<template>
  <el-row justify="center">
    <h1>Dashboard</h1>
  </el-row>
  <!-- <el-divider></el-divider> -->
  <el-tabs :stretch="true" v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Your Quiz" name="first"><h3>Your Quizzes</h3></el-tab-pane>
    <el-tab-pane label="Create Quiz" name="second"><CreateView /></el-tab-pane>
    <el-tab-pane label="History" name="third">History</el-tab-pane>
    <el-tab-pane label="Task" name="fourth"><TheWelcome /></el-tab-pane>
  </el-tabs>
</template>

<style scoped>
/* .content {
  width: auto;
  overflow-x: auto;
} */
</style>
