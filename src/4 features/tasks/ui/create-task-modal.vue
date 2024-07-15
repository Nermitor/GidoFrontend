<template>
  <client-only>
    <lazy-el-dialog v-model="isModalOpened" :title="`Новая задача в колонке ${column?.name}`">
      <el-form v-model="form">
        <el-form-item label="Название">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Описание">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleFormSubmit">Создать</el-button>
        </el-form-item>
      </el-form>
    </lazy-el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import type { TaskCreateRequestType } from '#entities/tasks';
import { tasksApi } from '#entities/tasks';
import type { ColumnType } from '#entities/columns';

type Emits = {
  (e: 'create'): void;
};

type Expose = {
  handleModalOpen: (newBoardId: number, column: ColumnType) => void;
};

const emit = defineEmits<Emits>();

const form = useState<TaskCreateRequestType>('createTaskForm', () => ({
  name: '',
  description: '',
  files: [],
}));

const boardId = useState<number | null>('createTaskBoardId', () => null);
const column = useState<ColumnType | null>('createTaskColumnId', () => null);

const isModalOpened = useState<boolean>('isCreateTaskModalOpened', () => false);

const handleModalOpen = (newBoardId: number, newColumn: ColumnType) => {
  boardId.value = newBoardId;

  column.value = newColumn;

  isModalOpened.value = true;
};

const handleFormSubmit = async () => {
  if (boardId.value && column.value) {
    const { error } = await tasksApi.add(column.value?.id, form.value);

    if (!error.value) {
      emit('create');

      isModalOpened.value = false;

      form.value = {
        name: '',
        description: '',
      };
    }
  }
};

defineExpose<Expose>({
  handleModalOpen,
});
</script>

<style scoped lang="scss">
.create-task-modal {
  &__button {
    width: 100%;
    height: 60px;
  }
}
</style>
