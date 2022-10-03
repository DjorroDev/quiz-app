<script setup>
import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { View, Close, EditPen } from "@element-plus/icons-vue";
import { db } from "@/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "@firebase/firestore";

// const router = useRouter();

const props = defineProps({
  userId: String,
});

const deleteQuiz = async (quiz, index) => {
  await deleteDoc(doc(db, "quizzes", quiz)).then(() => {
    console.log("done");
  });
  // console.log(cards.value[index]);
  cards.value.splice(index, 1);
};

const cards = ref([]);
onMounted(async () => {
  let getQuiz = [];
  const q = query(collection(db, "quizzes"), where("userId", "==", props.userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((quiz) => {
    // console.log(quiz.data());
    const card = {
      id: quiz.id,
      desc: quiz.data().description,
      title: quiz.data().title,
    };
    getQuiz.push(card);
  });
  cards.value = getQuiz;
});
</script>

<template>
  <el-row justify="center">
    <h3>All your quiz</h3>
  </el-row>
  <el-row :gutter="20" justify="center" align="top">
    <h4 v-if="!cards[0]">You dont have any quiz :(</h4>
    <el-col v-for="(card, i) in cards" :key="i" :xs="16" :span="10">
      <el-card class="quiz-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span style="font-weight: bold; font-size: large">{{ card.title }}</span>
            <div class="btn-quiz">
              <el-tooltip content="Show" effect="light" placement="top">
                <RouterLink class="link" :to="`/quiz/${card.id}`">
                  <el-button type="info" plain>
                    <el-icon class="icon"><View /></el-icon>
                    <!-- Show -->
                  </el-button>
                </RouterLink>
              </el-tooltip>
              <el-tooltip content="Edit" effect="light" placement="top">
                <RouterLink class="link" :to="`/edit/${card.id}`">
                  <el-button type="primary" plain>
                    <el-icon class="icon"> <EditPen /></el-icon>
                    <!-- Edit -->
                  </el-button>
                </RouterLink>
              </el-tooltip>
              <el-tooltip content="Delete" effect="light" placement="top">
                <el-button type="danger" @click="deleteQuiz(card.id, i)" plain>
                  <el-icon class="icon"><Close /></el-icon>
                  <!-- Delete -->
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </template>
        {{ card.desc }}
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.link {
  margin-right: 12px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  font-size: large;
}
.btn-quiz {
  display: flex;
  margin-left: 2px;
}
.el-col {
  margin: 10px;
}

.quiz-card {
  min-height: 160px;
}
@media screen and (max-width: 768px) {
  .el-col {
    min-width: 350px;
  }
  .card-header {
    /* text-align: center; */
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-quiz {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>
