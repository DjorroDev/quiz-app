<script setup>
import { ref } from "vue";

const activeIndex = ref("/");
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    :router="true"
    class="menu"
    mode="horizontal"
    :ellipsis="false"
    background-color=""
  >
    <el-menu-item index="/">LOGO</el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="/create">Create Quiz</el-menu-item>
    <el-menu-item index="/about">About</el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
/* .menu {
  min-width: max-content;
} */
header {
  margin-bottom: 1rem;
  /* min-width: max-content; */
  padding: 0 0 0 0;
}

.el-menu {
  padding: 0 40px 0 40px;
}

@media (max-width: 768px) {
  .el-menu {
    padding: 0 0 0 0;
  }
}
</style>
