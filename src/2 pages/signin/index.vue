<template>
  <signin-form @submit="onSubmit" />
</template>

<script lang="ts" setup>
import { SigninForm } from '#features/guest';
import { definePageMeta } from '#imports';
import type { AuthorizationPayloadType } from '#entities/guest';
import { guestApi } from '#entities/guest';
import { useRouter } from '#app';

definePageMeta({
  layout: 'auth',
});

const router = useRouter();

const onSubmit = async (form: AuthorizationPayloadType) => {
  const { error } = await guestApi.signIn(form);

  if (!error.value) {
    await router.push('/');
  }
};
</script>
