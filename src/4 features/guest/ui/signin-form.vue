<template>
  <el-form :model="form">
    <el-form-item label="Email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Войти</el-button>
    </el-form-item>
    <span>Нет аккаунта?</span> <nuxt-link :to="ROUTE_NAMES.SIGNUP">Зарегистрироваться</nuxt-link>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { AuthorizationPayloadType } from '#entities/guest';
import { ROUTE_NAMES } from '#shared/constants';

type Emits = {
  (event: 'submit', form: AuthorizationPayloadType): void;
};

const emit = defineEmits<Emits>();

const form = reactive<AuthorizationPayloadType>({
  email: '',
  password: '',
});

const submitForm = () => {
  emit('submit', form);
};
</script>
