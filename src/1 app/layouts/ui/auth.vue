<template>
  <el-container class="auth-layout">
    <Suspense>
      <slot />
    </Suspense>
  </el-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.auth-layout {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}
</style>
