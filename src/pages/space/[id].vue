<template>Тут типа задача {{ route.params.id }}</template>

<script setup lang="ts">
import { useRoute } from '#app';

const route = useRoute();
</script>

<style scoped></style>
