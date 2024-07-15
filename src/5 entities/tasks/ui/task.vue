<template>
  <el-card class="task" shadow="hover">
    <template #header>
      <div class="task__header">
        <div>
          {{ props.name }}
        </div>
        <div>
          <el-icon style="cursor: pointer" @click="handleTaskDelete"
            ><delete style="width: 1em; height: 1em"
          /></el-icon>
        </div>
      </div>
    </template>

    <template #default>
      {{ props.description }}
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { TaskType } from '#entities/tasks';
import { Delete } from '@element-plus/icons-vue';
import { tasksApi } from '#entities/tasks';

const props = defineProps<TaskType>();

const fetchColumns = inject('fetchColumns', async () => {});

const handleTaskDelete = async () => {
  const { error } = await tasksApi.drop(props.id, props.column_id);

  if (!error.value) {
    await fetchColumns();
  }
};
</script>

<style scoped lang="scss">
.task {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
