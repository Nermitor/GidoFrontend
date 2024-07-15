<template>
  <signup-form @submit="onSubmit" />
</template>

<script lang="ts" setup>
import { SignupForm } from '#features/guest';
import { definePageMeta } from '#imports';
import { useRouter } from '#app';
import { guestApi, type RegistrationPayloadType } from '#entities/guest';

definePageMeta({
  layout: 'auth',
});

const router = useRouter();

const onSubmit = async (form: RegistrationPayloadType) => {
  const { error } = await guestApi.signUp(form);

  if (!error.value) {
    await router.push('/');
  }
};
</script>
