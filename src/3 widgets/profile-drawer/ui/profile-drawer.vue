<template>
  <client-only>
    <lazy-el-drawer v-bind="$attrs" title="Профиль">
      <profile />
    </lazy-el-drawer>
  </client-only>
</template>

<script setup lang="ts">
import { Profile } from '#entities/user';
</script>

<style scoped lang="scss"></style>
