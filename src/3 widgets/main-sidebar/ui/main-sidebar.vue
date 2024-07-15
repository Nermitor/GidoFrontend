<template></template>

<script setup lang="ts">
import { CreateBoardModal } from '#widgets/create-board-modal';
import { useBoardsStore } from '#entities/boards';

const { boards, fetchBoards } = useBoardsStore();

const createBoardModalOpened = useState('isCreateBoardModalOpened', () => false);

const handleBoardCreateButtonClick = () => {
  createBoardModalOpened.value = true;
};

const handleBoardCreated = async () => {
  createBoardModalOpened.value = false;

  await fetchBoards();
};

await fetchBoards();
</script>
