<template>
  <div class="column">
    <div class="column__title">
      <div>
        {{ props.name }}
      </div>
      <div>
        <el-icon style="cursor: pointer" @click="handleColumnDelete"
          ><delete style="width: 1em; height: 1em"
        /></el-icon>
      </div>
    </div>
    <div class="column__tasks">
      <task v-for="task in props.tasks" :key="task.id" class="column__task" v-bind="task" />
      <div v-if="$slots.footer" class="column__task">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColumnType } from '#entities/columns';
import Task from '#entities/tasks/ui/task.vue';
import type { TaskType } from '#entities/tasks';
import { Delete } from '@element-plus/icons-vue';
import { columnsApi } from '#entities/columns';

type Props = ColumnType & {
  tasks: TaskType[];
};

const props = defineProps<Props>();

const fetchColumns = inject('fetchColumns', async () => {});

const handleColumnDelete = async () => {
  console.log('delete');

  const { error } = await columnsApi.drop(props.id, props.board_id);

  if (!error.value) {
    await fetchColumns();
  }
};
</script>

<style scoped lang="scss">
.column {
  background-color: #e5dddd;
  padding: 7px;

  &__title {
    padding: 10px;
    font-size: 1.5em;
    display: flex;
    justify-content: space-between;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__task {
    flex-shrink: 0;
  }
}
</style>
