<script setup>
// import TheWelcome from '@/components/TheWelcome.vue'
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const quizzes = ref([]);

onMounted(async () => {
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
  });
  quizzes.value = fbQuizzes;
  // console.log(fbQuizzes);
});
// console.log(quizzes);

// const quizzes = [
//   {
//     title: "Trivia Quiz",
//     description: "lorem ipsum dolor sit amet",
//     author: "Marco",
//   },
//   {
//     title: "Animal Quiz",
//     description: "lorem ipsum dolor sit amet",
//     author: "Budi",
//   },
//   {
//     title: "How smart are you?",
//     description:
//       "lorem ipsum dolor sit amet, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo ducimus odit modi eum. Voluptates esse iure libero doloribus dolor?",
//     author: "Budi",
//   },
//   {
//     title: "Pante Quiz",
//     description:
//       "lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ducimus odit modi eum. Voluptates esse iure libero doloribus dolor?",
//     author: "Bapakkau",
//   },
// ];
</script>

<template>
  <el-row justify="center">
    <el-col justify="center">
      <h1>Quiz</h1>
    </el-col>
    <el-row>
      <el-col>
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
}
</style>
