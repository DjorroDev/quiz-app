<script setup>
import { ref } from "vue";
import CreateView from "./CreateView.vue";
import { getAuth } from "@firebase/auth";
import YourQuiz from "../components/dashboard/YourQuiz.vue";

const activeName = ref("first");
const user = getAuth().currentUser;
</script>

<template>
  <el-row justify="center">
    <h1>Dashboard</h1>
  </el-row>
  <h4>Hello, {{ displayName }}</h4>
  <el-tabs :stretch="true" v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Your Quiz" name="first">
      <YourQuiz :user-id="user.uid" />
    </el-tab-pane>
    <el-tab-pane label="Create Quiz" name="second"><CreateView /></el-tab-pane>
    <el-tab-pane label="History" name="third"><h2>Coming soon</h2></el-tab-pane>
    <el-tab-pane label="Favorites" name="fourth"><h2>Coming soon too</h2></el-tab-pane>
  </el-tabs>
</template>
