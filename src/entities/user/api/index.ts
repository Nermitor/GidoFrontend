import { useFetchWrap } from '#shared/api/useFetchWrap';
import type { UserType } from '#entities/user';

const get = async () => {
  return useFetchWrap<UserType>({
    url: '/api/profile/get',
    fetchOptions: {
      method: 'get',
    },
  });
};

export const userApi = {
  get,
};
