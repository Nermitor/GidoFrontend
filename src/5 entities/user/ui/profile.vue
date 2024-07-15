<template>
  <div class="profile">
    <el-avatar :size="100" shape="circle" :icon="UserFilled" />
    <div style="display: flex; justify-content: space-between; gap: 10px; align-items: center">
      <div>
        <h1>{{ user?.name }}</h1>
      </div>
      <div>
        <router-link to="/signin">
          <el-icon style="font-size: 20px"><circle-close style="width: 1em; height: 1em" /></el-icon>
        </router-link>
      </div>
    </div>

    <span>{{ user?.email }}</span>
  </div>
</template>

<script setup lang="ts">
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { useUserStore } from '#entities/user';

const { user, fetchUser } = useUserStore();

await fetchUser();
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
