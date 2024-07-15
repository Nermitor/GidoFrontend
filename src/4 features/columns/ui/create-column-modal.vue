<template>
  <el-button class="create-column-modal__button" @click="handleModalOpen">Создать</el-button>
  <client-only>
    <lazy-el-dialog v-model="isModalOpened" title="Новая колонка">
      <el-form :model="form">
        <el-form-item label="Название">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-button type="primary" @click="handleFormSubmit">Создать</el-button>
      </el-form>
    </lazy-el-dialog>
  </client-only>
</template>

<script setup lang="ts">
import { type ColumnCreateType, useColumnsApi } from '#entities/columns';

type Emits = {
  (e: 'created'): void;
};

type Props = {
  boardId: number;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const columnsApi = useColumnsApi(props.boardId);

const form = useState<ColumnCreateType>('createColumnForm', () => ({
  name: '',
}));

const isModalOpened = useState<boolean>('isCreateColumnModalOpened', () => false);

const handleFormSubmit = async () => {
  const { error } = await columnsApi.add(form.value);

  if (!error.value) {
    emit('created');

    isModalOpened.value = false;
  }
};

const handleModalOpen = () => {
  isModalOpened.value = true;
};
</script>

<style scoped lang="scss">
.create-column-modal {
  &__button {
    width: 100%;
    height: 60px;
  }
}
</style>
