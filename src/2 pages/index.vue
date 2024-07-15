<template>
  <div> Создайте новую доску в панели справа или попросите добавить вас в существующую доску. </div>
</template>

<script setup lang="ts">
import { boardsApi, type BoardType } from '#entities/boards';

definePageMeta({
  middleware: 'auth',
});

const boards = useState<BoardType[]>('boards', () => []);

const fetchBoards = async () => {
  const { data, error } = await boardsApi.getAll();

  if (!error.value && data.value) {
    boards.value = data.value.payload;
  }
};

await fetchBoards();
</script>

<style scoped></style>
