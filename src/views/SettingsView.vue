<script setup>
import { ref } from "vue";
import { getAuth, updateProfile } from "@firebase/auth";

const user = getAuth().currentUser;
const input = ref(user.displayName);
const alert = ref({
  type: "",
  msg: "",
});

async function update(username) {
  alert.value = {
    msg: "",
    type: "",
  };
  if (user.displayName === username) {
    alert.value = {
      msg: "new username can't be the old one",
      type: "error",
    };
  } else {
    await updateProfile(user, {
      displayName: username,
    })
      .then(() => {
        alert.value = {
          msg: "Update username succed",
          type: "success",
        };
      })
      .catch((error) => {
        alert.value = {
          msg: `Something isn't right error: ${error.code}`,
          type: "error",
        };
      });
  }
}
</script>

<template>
  <h1>settings</h1>
  <el-card style="width: 400px">
    <el-alert v-if="alert.msg" :title="alert.msg" :type="alert.type" />
    <div class="card-settings">
      <h3>change username</h3>
      <el-input placeholder="coming soon" v-model="input" />
      <el-button @click="update(input)" style="margin-top: 15px" type="primary">Update</el-button>
    </div>
  </el-card>
</template>
