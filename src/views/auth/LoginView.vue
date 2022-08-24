<script setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

const formLogin = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <el-col justify="center" align="center">
    <h1>Login</h1>
    <el-row justify="center">
      <div class="form">
        <!-- <template #header>Login</template> -->
        <el-form
          label-position="top"
          label-width="120px"
          :model="formLogin"
          style="max-width: 400px"
        >
          <el-form-item label="Email">
            <el-input type="email" v-model="formLogin.email" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="formLogin.password" />
          </el-form-item>
          <div>
            <RouterLink to="/register">
              <el-button size="large" type="primary" link>Register new account here</el-button>
            </RouterLink>
          </div>
          <el-button class="btn-form" type="primary">Login</el-button>
        </el-form>
        <el-divider class="divider">OR</el-divider>
        <!-- <h2>Google auth</h2> -->
        <el-button size="large">
          <object
            data="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png"
          />
          <el-divider direction="vertical" />Sign in with google
        </el-button>
      </div>
    </el-row>
  </el-col>
</template>

<style scoped>
h1 {
  font-size: xx-large;
}
.form {
  width: 450px;
  justify-content: start;
  border: 1px solid #414243;
  padding: 40px 20px 40px 20px;
  border-radius: 4px;
  /* box-shadow: 4px 4px rgba(0, 0, 0, 0.72); */
}

.btn-form {
  /* display: flex; */
  justify-content: flex-end;
  margin-top: 15px;
}

.divider {
  margin: 30px 0 30px 0;
}
</style>
