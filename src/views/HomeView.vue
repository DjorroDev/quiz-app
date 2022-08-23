<script setup>
// import TheWelcome from '@/components/TheWelcome.vue'
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const quizzes = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  const querySnapshot = await getDocs(collection(db, "quizzes"));
  let fbQuizzes = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().title}`);
    const quiz = {
      id: doc.id,
      description: doc.data().description,
      author: doc.data().author,
      title: doc.data().title,
    };
    fbQuizzes.push(quiz);
    isLoading.value = false;
  });
  quizzes.value = fbQuizzes;
  // console.log(fbQuizzes);
});
</script>

<template>
  <el-row justify="center">
    <el-col justify="center">
      <h1>Quiz</h1>
    </el-col>
    <el-row>
      <el-col>
        <el-skeleton animated :loading="isLoading" :count="3">
          <template #template>
            <div class="border">
              <el-skeleton-item class="skeleton" variant="rect" />
            </div>
          </template>
        </el-skeleton>
        <el-card
          v-for="(quiz, i) in quizzes"
          :key="i"
          class="box-card"
          :body-style="{ padding: '0px 20px 0px 20px' }"
        >
          <template #header>
            <div class="card-header">
              <div>
                <span>{{ quiz.title }}</span>
                <span class="author">Author: {{ quiz.author }}</span>
              </div>
              <RouterLink :to="`/quiz/${quiz.id}`">
                <el-button type="primary">Start</el-button>
              </RouterLink>
            </div>
          </template>
          <p class="text">
            {{ quiz.description }}
          </p>
        </el-card>
      </el-col>
    </el-row>
  </el-row>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: xx-large;
}
.author {
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-style: bold;
}

.border {
  margin: 15px 0 15px 0;
}

.skeleton {
  width: 370px;
  height: 120px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  line-height: 1.3;
}

.item {
  margin-bottom: 8px;
  margin-top: 10px;
}

.box-card {
  margin-top: 16px;
  margin-bottom: 16px;
  justify-content: center;
  width: 370px;
}

@media all and (min-width: 768px) {
  .box-card {
    margin-top: 16px;
    margin-bottom: 16px;
    justify-content: center;
    width: 600px;
  }
  .skeleton {
    width: 600px;
    height: 120px;
  }
}
</style>
