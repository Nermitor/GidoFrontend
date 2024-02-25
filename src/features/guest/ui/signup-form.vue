<template>
  <el-form :model="form">
    <el-form-item label="Имя">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Зарегистрироваться</el-button>
    </el-form-item>
    <span>Есть аккаунт?</span> <nuxt-link :to="ROUTE_NAMES.SIGNIN">Войти</nuxt-link>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { RegistrationPayloadType } from '#entities/guest';
import { ROUTE_NAMES } from '#shared/constants';

type Emits = {
  (event: 'submit', form: RegistrationPayloadType): void;
};

const emit = defineEmits<Emits>();

const form = reactive<RegistrationPayloadType>({
  name: '',
  email: '',
  password: '',
});

const submitForm = () => {
  emit('submit', form);
};
</script>
