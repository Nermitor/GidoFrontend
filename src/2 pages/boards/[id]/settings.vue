<template>
  <div class="settings">
    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px">
      <div>
        <h1> Настройки доски {{ currentBoard?.name }} </h1>
      </div>
      <div>
        <el-icon style="cursor: pointer; font-size: 20px" @click="handleBoardDelete"
          ><delete style="width: 1em; height: 1em"
        /></el-icon>
      </div>
    </div>

    <div class="settings__flex">
      <div class="settings__table">
        <h2>Список участников</h2>
        <client-only>
          <el-table :data="currentBoard?.members" style="width: 100%">
            <el-table-column fixed prop="name" label="Имя" width="150" />
            <el-table-column fixed prop="email" label="Почта" width="120" />
            <el-table-column fixed prop="role.name" label="Роль" width="120" />
            <el-table-column align="center" fixed="right" width="120">
              <template #default="scope">
                <el-button
                  v-if="scope.row.role.name === 'Member'"
                  link
                  type="primary"
                  size="small"
                  @click.prevent="handleMemberDelete(scope.row.id)"
                >
                  <el-icon style="font-size: 20px; color: #000000">
                    <delete style="width: 1em; height: 1em" />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </client-only>
      </div>
      <div class="settings__member-add">
        <h2>Добавить участников</h2>
        <el-input v-model="searchQuery" placeholder="Поиск по имени" @input="handleSearchQueryChange" />
        <client-only>
          <el-table :data="searchBoardData" style="width: 100%">
            <el-table-column fixed prop="name" label="Имя" width="150" />
            <el-table-column fixed prop="email" label="Почта" width="120" />
            <el-table-column align="center" fixed="right" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="handleMemberAdd(scope.row.id)">
                  <el-icon style="font-size: 20px; color: #000000">
                    <plus style="width: 1em; height: 1em" />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { boardsApi, useBoardsStore } from '#entities/boards';
import { Delete, Plus } from '@element-plus/icons-vue';
import { userApi, type UserType } from '#entities/user';
import { debounce } from '#shared/decorators';

const route = useRoute();
const router = useRouter();

const searchQuery = ref();

const searchBoardData = ref<UserType[]>([]);

const boardId = computed(() => {
  return Number(route.params.id);
});

const { boards, fetchBoards } = useBoardsStore();

const currentBoard = computed(() => {
  return boards.value.find((board) => board.id === boardId.value);
});

const handleMemberDelete = async (userId: number) => {
  const { error } = await boardsApi.deleteMember(boardId.value, userId);

  if (!error.value) {
    await fetchBoards();
  }
};

const handleMemberAdd = async (id: number) => {
  const { error } = await boardsApi.addMember(boardId.value, id);

  if (!error.value) {
    await fetchBoards();
  }
};

const currentBoardMembersIds = computed(() => {
  return currentBoard.value?.members.map((member) => member.id);
});

const handleSearchQueryChange = debounce(async () => {
  const { data } = await userApi.getAll(searchQuery.value);

  if (data.value) {
    searchBoardData.value = data.value.payload.filter((user) => {
      return !currentBoardMembersIds.value?.includes(user.id);
    });
  }
}, 400);

const handleBoardDelete = async () => {
  const { error } = await boardsApi.drop(boardId.value);

  if (!error.value) {
    await router.push('/');

    await fetchBoards();
  }
};
</script>

<style scoped lang="scss">
.settings {
  h2 {
    margin-bottom: 10px;
  }
  &__flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
