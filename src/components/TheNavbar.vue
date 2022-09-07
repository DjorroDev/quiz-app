<script setup>
import { ref, watch, onMounted } from "vue";
import { UserFilled, Menu, Tickets, Plus } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";

const route = useRoute();
const router = useRouter();
console.log(route.path);

const urlPath = ref(route.path);
const isLoggedIn = ref();

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

watch(urlPath, async (newPath, oldPath) => {
  console.log(newPath);
  console.log(oldPath);
});

const activeIndex = ref("/");

const handleLogOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
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
    <el-menu-item index="/">
      <el-icon :size="35"><Tickets /></el-icon>
      QUIZ
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item class="menu-item" index="/create">
      <el-icon><Plus /></el-icon>Create Quiz</el-menu-item
    >
    <el-menu-item class="menu-item" index="/about">About</el-menu-item>
    <el-sub-menu class="menu-item-mobile" index="1">
      <template #title>
        <el-icon :size="25"><Menu /></el-icon>
        Menu
      </template>
      <el-menu-item index="/create"
        ><el-icon><Plus /></el-icon>Create Quiz</el-menu-item
      >
      <el-menu-item index="/about">About Page</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon :size="25"><UserFilled /></el-icon>
      </template>
      <el-menu-item v-if="isLoggedIn" index="/dashboard">Dashboard</el-menu-item>
      <div v-if="!isLoggedIn">
        <el-menu-item index="/login">Login</el-menu-item>
        <el-menu-item index="/register">Register</el-menu-item>
      </div>
      <div v-else>
        <el-menu-item index="settings"> Settings </el-menu-item>
        <el-divider style="margin: 0 0 0 0" />
        <el-menu-item @click="handleLogOut" index=""> Log out </el-menu-item>
      </div>
    </el-sub-menu>
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

.menu-item-mobile {
  display: none;
}

.menu-icon {
  margin: auto;
  margin-left: 15px;
  margin-right: 15px;
}

.el-menu {
  padding: 0 40px 0 40px;
}

@media (max-width: 768px) {
  .menu-item-mobile {
    display: flex;
    padding: 0;
  }
  .menu-item {
    display: none;
  }
  .el-menu {
    padding: 0 0 0 0;
  }

  .el-avatar {
    margin-right: 10px;
  }
}
</style>
