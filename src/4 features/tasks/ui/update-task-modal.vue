<template>
  <client-only>
    <lazy-el-dialog v-model="isModalOpened" :title="`Редактирование задачи в колонке ${column?.name}`">
      <el-form v-model="form">
        <el-form-item label="Название">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Описание">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handleFormSubmit">Изменить</el-button>
        </el-form-item>
      </el-form>
    </lazy-el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { type TaskUpdateRequestType, type TaskType, tasksApi } from '#entities/tasks';
import { type ColumnType } from '#entities/columns';
import { objectSmartMerge } from '#shared/utlis';

type Emits = {
  (e: 'update'): void;
};

const emit = defineEmits<Emits>();

const form = useState<TaskUpdateRequestType>('createTaskForm', () => ({
  name: '',
  description: '',
}));

const boardId = useState<number | null>('updateTaskBoardId', () => null);
const column = useState<ColumnType | null>('updateTaskColumn', () => null);
const task = useState<TaskType | null>('updateTask', () => null);

const isModalOpened = useState<boolean>('isUpdateTaskModalOpened', () => false);

const handleModalOpen = (currentBoardId: number, currentColumn: ColumnType, currentTask: TaskType) => {
  boardId.value = currentBoardId;

  column.value = currentColumn;

  task.value = currentTask;

  form.value = objectSmartMerge(form.value, currentTask);
};

const handleFormSubmit = async () => {
  if (boardId.value && column.value && task.value) {
    const { error } = await tasksApi.edit(task.value?.id, column.value?.id, form.value);

    if (!error.value) {
      emit('update');

      isModalOpened.value = false;
    }
  }
};

defineExpose({
  handleModalOpen,
});
</script>
