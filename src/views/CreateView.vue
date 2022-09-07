<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth } from "@firebase/auth";

const router = useRouter();

const user = getAuth().currentUser;

const form = reactive({
  title: "",
  author: user.displayName,
  description: "",
  body: [
    {
      answer: "Answer chosen from option",
      choices: ["You can Add option", "You can Delete option", "Answer chosen from option"],
      question: "Example",
    },
  ],
  userId: user.uid,
});

const ruleFormRef = ref();

const rules = reactive({
  title: [
    {
      required: true,
      message: "This field is required",
      trigger: "blur",
    },
    {
      max: 60,
      message: "Length no more than 60",
      trigger: "blur",
    },
  ],
  author: [
    {
      required: true,
      message: "This field is required",
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: "This field is required",
      trigger: "blur",
    },
  ],
});

const submit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("submit!");
      addDoc(collection(db, "quizzes"), form);
      router.push("/");
    } else {
      console.log("error submit!", fields);
    }
  });
};

function newQuestion() {
  form.body.push({
    answer: "",
    choices: [""],
    question: "",
  });
}

function newChoice(index) {
  // console.log(form.body[0].choices);
  form.body[index].choices.push("");
}

function deleteChoice(index) {
  form.body[index].choices.pop();
}

function deleteQuestion(index) {
  form.body.splice(index, 1);
}
</script>
<template>
  <el-row justify="center">
    <el-form
      ref="ruleFormRef"
      class="form"
      label-position="top"
      label-width="100px"
      :model="form"
      :rules="rules"
      style="max-width: 460px"
      :hide-required-asterisk="true"
    >
      <h1>Create New Quiz</h1>
      <el-form-item label="Title" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="Author" prop="author">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input type="textarea" v-model="form.description" />
      </el-form-item>

      <h3>Quiz Body</h3>
      <h4>Total question: {{ form.body.length }}</h4>

      <el-card class="box-card" v-for="(body, i) in form.body" :key="i">
        <template #header>
          <div class="card-header">
            <span>{{ `#${i + 1}` }}</span>
            <el-button class="button" type="danger" @click="deleteQuestion(i)" text
              >Delete question</el-button
            >
          </div>
        </template>
        <el-form-item
          label="Question"
          :prop="`body[${i}].question`"
          :rules="{
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          }"
        >
          <el-input v-model="body.question" />
        </el-form-item>
        <el-card>
          <div>
            <el-row justify="space-between">
              <h3>Choices</h3>
              <el-button @click="newChoice(i)">Add</el-button>
              <el-button @click="deleteChoice(i)">Delete</el-button>
            </el-row>
            <el-form-item
              :prop="`body[${i}].choices[${j}]`"
              :rules="{
                required: true,
                message: 'This field is required',
                trigger: 'blur',
              }"
              v-for="(choice, j) in body.choices"
              :key="j"
              :label="String.fromCharCode(j + 65)"
            >
              <el-input v-model="form.body[i].choices[j]" />
            </el-form-item>
          </div>
        </el-card>
        <el-form-item
          class="answer"
          :prop="`body[${i}.answer]`"
          label="Answer"
          :rules="{
            required: true,
            message: 'This field is required',
            trigger: 'change',
          }"
        >
          <el-select v-model="body.answer" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="(choice, k) in body.choices"
              :key="k"
              :label="choice"
              :value="choice"
            />
          </el-select>
        </el-form-item>
      </el-card>
      <el-button size="large" @click="newQuestion">Add new quetion</el-button>
      <el-button @click="submit(ruleFormRef)" size="large" type="primary"
        >Submit new Quiz</el-button
      >
    </el-form>
  </el-row>
</template>

<style scoped>
.box-card {
  margin: 20px 0 20px 0;
}

button {
  margin-right: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.answer {
  margin-top: 16px;
}
.el-row {
  align-items: center;
}
.form {
  width: 360px;
}

@media all and (min-width: 768px) {
  .form {
    width: 1000px;
  }
}
</style>
