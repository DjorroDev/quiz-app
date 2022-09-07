<script setup>
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const router = useRouter();
const formLogin = reactive({
  email: "",
  password: "",
});

const errMsg = ref();
const auth = getAuth();

const ruleFormRef = ref();

const rules = reactive({
  email: [{ required: true, message: "Please input the email", trigger: "blur" }],
  password: [{ required: true, message: "Please input the pass", trigger: "blur" }],
});

const submit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      errMsg.value = "";
      signInWithEmailAndPassword(auth, formLogin.email, formLogin.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          router.push("/dashboard");
        })
        .catch((error) => {
          error ? (errMsg.value = "Email or password was incorrect") : "";
        });
    }
  });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      router.push("/dashboard");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <el-col justify="center" align="center">
    <h1>Login</h1>
    <el-row justify="center">
      <div class="form">
        <!-- <template #header>Login</template> -->
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          label-position="top"
          label-width="120px"
          :model="formLogin"
          style="max-width: 400px"
          :hide-required-asterisk="true"
        >
          <el-alert v-if="errMsg" :title="`${errMsg}`" type="error" show-icon />
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="formLogin.email" required />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="formLogin.password" show-password />
          </el-form-item>
          <div>
            <RouterLink to="/register">
              <el-button size="large" type="primary" link>Register new account here</el-button>
            </RouterLink>
          </div>
          <el-button @click="submit(ruleFormRef)" class="btn-form" type="primary">Login</el-button>
        </el-form>
        <el-divider class="divider">OR</el-divider>
        <!-- <h2>Google auth</h2> -->
        <el-button @click="signInWithGoogle()" size="large">
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
.el-alert {
  margin: 0px 0 20px 0;
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
