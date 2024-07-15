import { useFetchWrap } from '#shared/api';
import type { EditUserType, UserType } from '#entities/user';

const get = async () => {
  return useFetchWrap<UserType>({
    url: '/api/profile',
  });
};

const edit = async (body: EditUserType) => {
  return useFetchWrap({
    url: '/api/profile',
    fetchOptions: {
      method: 'patch',
      body,
    },
  });
};

const getAll = async (name: string = '') => {
  return useFetchWrap<UserType[]>({
    url: `/api/users?name=${name}`,
  });
};

export const userApi = {
  get,
  edit,
  getAll,
};
