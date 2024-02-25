<template>
  <div class="profile">
    <el-avatar :size="100" shape="circle" :icon="UserFilled" />
    <h1>{{ user?.name }}</h1>
    <span>{{ user?.email }}</span>
  </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import { useUserStore } from '#entities/user';

const userStore = useUserStore();

const user = await userStore.get();
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
