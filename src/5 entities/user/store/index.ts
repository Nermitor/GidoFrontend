import { useState } from '#app';
import type { UserType } from '#entities/user';
import { userApi } from '#entities/user';

export const useUserStore = () => {
  const user = useState<UserType | undefined>('storedUser', () => undefined);

  const fetchUser = async () => {
    const { error, data } = await userApi.get();

    if (!error.value && data.value) {
      user.value = data.value?.payload;
    }
  };

  return {
    user,
    fetchUser,
  };
};
