import { defineStore } from 'pinia';
import { useState } from '#app';
import type { UserType } from '#entities/user';
import { userApi } from '#entities/user';

export const useUserStore = defineStore('userStore', () => {
  const user = useState<UserType | null>('storedUser', () => null);

  const fetchUser = async () => {
    const { data, error } = await userApi.get();

    if (!error.value && data.value) {
      user.value = data.value;
    } else {
      user.value = null;
    }
  };

  const get = async () => {
    await fetchUser();

    return user;
  };

  return {
    get,
  };
});
