<template>
  <el-container class="default-layout">
    <el-header class="header">
      <div class="header_brand"> Gido </div>
      <div class="header__profile">
        <ElAvatar class="header__avatar" shape="circle" :icon="UserFilled" @click="drawerOpened = !drawerOpened" />
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--        <client-only>-->
        <!--          <main-sidebar />-->
        <!--        </client-only>-->
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
  <profile-drawer v-if="drawerOpened" v-model="drawerOpened" title="Профиль" />
</template>

<script setup lang="ts">
// import { MainSidebar } from '#widgets/main-sidebar';
import { ProfileDrawer } from '#widgets/profile-drawer';

import { UserFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';

const drawerOpened = ref(false);
</script>

<style scoped lang="scss">
.default-layout {
  height: 100%;
}

.header {
  background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__avatar {
    cursor: pointer;
  }
}
</style>
