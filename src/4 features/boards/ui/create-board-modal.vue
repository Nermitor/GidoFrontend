<template>
  <lazy-el-dialog>
    <el-form>
      <el-form-item label="Название">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Создать</el-button>
      </el-form-item>
    </el-form>
  </lazy-el-dialog>
</template>

<script setup lang="ts">
import { type BoardCreateType, boardsApi, useBoardsStore } from '#entities/boards';

type Emits = {
  (e: 'update:modelValue', value: boolean): void;
};

const emit = defineEmits<Emits>();

const { fetchBoards } = useBoardsStore();

const form = reactive<BoardCreateType>({
  name: '',
});

const handleSubmit = async () => {
  const { error } = await boardsApi.add(form);

  if (!error.value) {
    await fetchBoards();

    emit('update:modelValue', false);
  }
};
</script>

<style scoped lang="scss"></style>
