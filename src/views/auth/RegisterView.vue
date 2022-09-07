<script setup>
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const router = useRouter();
const formRegister = reactive({
  username: "",
  email: "",
  pass: "",
  confirmPass: "",
});

const ruleFormRef = ref();
const auth = getAuth();

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== formRegister.pass) {
    callback(new Error("Password don't match"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [{ required: true, message: "Please input the username", trigger: "blur" }],
  email: [
    { type: "email", message: "Must be a valid email", trigger: "change" },
    { required: true, message: "Please input the email", trigger: "blur" },
  ],
  pass: [
    { required: true, message: "Please input the pass", trigger: "blur" },
    { min: 6, message: "the password minimun is 6 character", trigger: "blur" },
  ],
  confirmPass: [{ validator: validatePass, trigger: "change" }],
});

const submit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log("submit!");
      createUserWithEmailAndPassword(auth, formRegister.email, formRegister.pass)
        .then(async () => {
          await updateProfile(auth.currentUser, {
            displayName: formRegister.username,
          });
          router.push("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
        });
    } else {
      console.log("error submit!");
      return false;
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
    <h1>Register</h1>
    <el-row justify="center">
      <div class="form">
        <!-- <template #header>Register</template> -->
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          label-position="top"
          label-width="120px"
          :model="formRegister"
          style="max-width: 400px"
          :hide-required-asterisk="true"
          status-icon
        >
          <el-form-item label="Username" prop="username">
            <el-input type="username" v-model="formRegister.username" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="formRegister.email" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="formRegister.pass" />
          </el-form-item>
          <el-form-item label="Confirm Password" prop="confirmPass">
            <el-input type="password" v-model="formRegister.confirmPass" />
          </el-form-item>
          <div>
            <RouterLink to="/login">
              <el-button size="large" type="primary" link
                >Login here if already create account</el-button
              >
            </RouterLink>
          </div>
          <el-button class="btn-form" @click="submit(ruleFormRef)" type="primary"
            >Register</el-button
          >
        </el-form>
        <el-divider class="divider">OR</el-divider>
        <h2>Google auth</h2>
        <el-button size="large" @click="signInWithGoogle()">
          <object
            data="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png"
          />
          <el-divider direction="vertical" />Sign up with google
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
