<template>
  <el-container class="default-layout">
    <el-header class="header">
      <div class="header_brand"> Gido </div>
      <div class="header__profile">
        <ElAvatar class="header__avatar" shape="circle" :icon="UserFilled" @click="isDrawerOpen = !isDrawerOpen" />
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <client-only>
          <el-menu default-active="1">
            <el-sub-menu v-model="isMenuOpened" index="1">
              <template #title> Воркспейсы </template>
              <el-menu-item-group title="Администратор">
                <nuxt-link
                  v-for="board in administratedBoards"
                  :key="board.id"
                  active-class=""
                  :to="`/boards/${board.id}`"
                >
                  <el-menu-item style="display: flex; justify-content: space-between">
                    <div>
                      {{ board.name }}
                    </div>
                    <div>
                      <router-link :to="`/boards/${board.id}/settings`">
                        <el-icon style="cursor: pointer"><setting /></el-icon>
                      </router-link>
                    </div>
                  </el-menu-item>
                </nuxt-link>
                <el-menu-item>
                  <el-button type="success" @click="handleBoardCreateButtonClick">Создать</el-button>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group v-if="nonAdministratedBoards.length" title="Участник">
                <nuxt-link
                  v-for="board in nonAdministratedBoards"
                  :key="board.id"
                  active-class=""
                  :to="`/boards/${board.id}`"
                >
                  <el-menu-item>
                    {{ board.name }}
                  </el-menu-item>
                </nuxt-link>
              </el-menu-item-group>
            </el-sub-menu>
            <create-board-modal v-if="createBoardModalOpened" v-model="createBoardModalOpened" />
          </el-menu>
        </client-only>
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
    <profile-drawer v-if="isDrawerOpen" v-model="isDrawerOpen" title="Профиль" />
  </el-container>
</template>

<script setup lang="ts">
import { ProfileDrawer } from '#widgets/profile-drawer';

import { Setting, UserFilled } from '@element-plus/icons-vue';
import { useBoardsStore } from '#entities/boards';
import { CreateBoardModal } from '#features/boards';
import { useUserStore } from '#entities/user';

const { boards, fetchBoards } = useBoardsStore();

const { user, fetchUser } = useUserStore();

const createBoardModalOpened = useState('isCreateBoardModalOpened', () => false);

const isDrawerOpen = ref(false);
const isMenuOpened = ref(true);

const administratedBoards = computed(() => {
  return boards.value.filter(
    (board) => board.members.find((member) => member.id === user.value?.id)?.role.name === 'Admin'
  );
});

const nonAdministratedBoards = computed(() => {
  return boards.value.filter(
    (board) => board.members.find((member) => member.id === user.value?.id)?.role.name === 'Member'
  );
});

const handleBoardCreateButtonClick = () => {
  createBoardModalOpened.value = true;
};

await fetchUser();

await fetchBoards();

useSeoMeta({
  title: 'Главная',
});
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
