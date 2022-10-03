<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute, RouterLink } from "vue-router";

const quiz = ref({});
const modalWidth = ref("35%");
if (window.screen.width < 768) {
  modalWidth.value = "90%";
}

onMounted(async () => {
  const docSnap = await getDoc(doc(db, "quizzes", useRoute().params.id));
  let fbQuiz = {
    title: docSnap.data().title,
    description: docSnap.data().description,
    author: docSnap.data().author,
    body: docSnap.data().body,
  };
  quiz.value = fbQuiz;
  // if (docSnap.exists()) {
  //   console.log(docSnap.data());
  // } else {
  //   console.log("No such document!");
  // }
});

const answers = ref([]);

const modalVisible = ref(false);
const percentage = ref(0);

function modal(show) {
  modalVisible.value = show;
  let point = 0;
  answers.value.forEach((answer, i) => {
    const correctAnswer = quiz.value.body[i].answer;
    if (answer === correctAnswer) {
      point++;
    }
  });

  const result = Math.round((point / quiz.value.body.length) * 100);
  setTimeout(() => {
    percentage.value = result;
  }, 200);
}

const colors = [
  { color: "#f56c6c", percentage: 0 },
  { color: "#e6a23c", percentage: 50 },
  { color: "#67c23a", percentage: 70 },
];

// function check() {
//   console.log(answers.value);
// }
</script>

<template>
  <el-row justify="center">
    <el-col>
      <h1>{{ quiz.title }}</h1>
      <el-descriptions class="margin-top" direction="horizontal" :column="1" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Author</div>
          </template>
          {{ quiz.author }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">Description</div>
          </template>
          {{ quiz.description }}
        </el-descriptions-item>
      </el-descriptions>
    </el-col>

    <el-col>
      <el-card class="box-card">
        <div v-for="(question, i) in quiz.body" :key="i">
          <h2>{{ `${i + 1}. ${question.question}` }}</h2>
          <el-descriptions class="cell" direction="horizontal" :column="1" border>
            <el-descriptions-item width="10px" v-for="(choice, j) in question.choices" :key="j">
              <template #label>
                <div class="cell-item-1">
                  <el-radio size="large" :label="choice" v-model="answers[i]">
                    {{ String.fromCharCode(j + 65) }}
                  </el-radio>
                </div>
              </template>
              <div class="cell-item-2">
                {{ choice }}
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <el-divider />
        </div>
        <el-popconfirm
          title="Are you sure want to submit?"
          confirm-button-text="Confirm"
          cancel-button-text="Cancel"
          @confirm="modal(true)"
        >
          <template #reference>
            <el-button size="large">submit</el-button>
          </template>
        </el-popconfirm>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog v-model="modalVisible" title="Result" :width="modalWidth">
    <div class="container">
      <el-progress
        type="dashboard"
        :stroke-width="15"
        :width="200"
        :percentage="percentage"
        :color="colors"
      />
      <h1>Congratsss</h1>
      <routerLink to="/">
        <el-button type="primary">Back to home</el-button>
      </routerLink>
    </div>
  </el-dialog>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box-card {
  margin-top: 20px;
}

h2 {
  margin-bottom: 24px;
}

.cell {
  display: flex;
}
.cell-item-2 {
  min-width: 36rem;
}

@media all and (max-width: 768px) {
  .cell-item-2 {
    min-width: 200px;
  }
  /* .el-dialog {
    width: 90%;
  } */
}
</style>
