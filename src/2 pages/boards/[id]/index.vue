<template>
  <div class="board-page">
    <div class="board-page__column">
      <create-column-modal :board-id="boardId" @created="fetchColumns" />
    </div>
    <column v-for="column in columns" :key="column.id" v-bind="column" class="board-page__column">
      <template #footer>
        <el-button type="primary" @click="handleCreateTaskModalOpen(boardId, column)">Создать задачу</el-button>
      </template>
    </column>
    <create-task-modal ref="createTaskModalRef" @create="fetchColumns" />
    <update-task-modal ref="updateTaskModalRef" @update="fetchColumns" />
  </div>
</template>

<script setup lang="ts">
import { Column, columnsApi, type ColumnType } from '#entities/columns';
import { tasksApi, type TaskType } from '#entities/tasks';
import { CreateColumnModal } from '#features/columns';
import { CreateTaskModal, UpdateTaskModal } from '#features/tasks';
import { boardsApi, useBoardsStore } from '#entities/boards';

type ColumnWithTasksType = ColumnType & {
  tasks: TaskType[];
};

const createTaskModalRef = ref<InstanceType<typeof CreateTaskModal>>();
const updateTaskModalRef = ref<InstanceType<typeof UpdateTaskModal>>();

const nuxtApp = useNuxtApp();

const route = useRoute();

const { boards } = useBoardsStore();

const boardId = computed(() => Number(route.params.id));

const board = computed(() => {
  return boards.value.find((board) => board.id === boardId.value);
});

const columns = useState<ColumnWithTasksType[]>('pageColumns', () => []);

const handleCreateTaskModalOpen = (boardId: number, column: ColumnType) => {
  createTaskModalRef.value?.handleModalOpen(boardId, column);
};

const handleUpdateTaskModalOpen = (currentBoardId: number, currentColumn: ColumnType, currentTask: TaskType) => {
  updateTaskModalRef.value?.handleModalOpen(currentBoardId, currentColumn, currentTask);
};

const fetchColumns = async () => {
  const { data, error } = await columnsApi.getAll(boardId.value);

  if (!error.value && data.value) {
    columns.value = await Promise.all(
      data.value.payload.map(async (column: ColumnType) => ({
        ...column,
        tasks: await nuxtApp.runWithContext(() => fetchTasks(column.id)),
      }))
    );
  }
};

const fetchTasks = async (columnId: number) => {
  const { data, error } = await tasksApi.getAll(columnId);

  if (!error.value && data.value) {
    return data.value.payload;
  }

  return [];
};

await fetchColumns();

useSeoMeta({
  title: board.value?.name,
});

provide('fetchColumns', fetchColumns);
</script>

<style lang="scss" scoped>
.board-page {
  overflow: scroll;
  display: flex;
  height: 100%;
  gap: 30px;
  padding-bottom: 30px;

  &__column {
    width: 200px;
    flex-shrink: 0;
    height: fit-content;
  }
}
</style>
