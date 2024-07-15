import { useFetchWrap } from '#shared/api/useFetchWrap';
import type { BoardCreateType, BoardMemberType, BoardType } from '../types';

const getAll = () => {
  return useFetchWrap<BoardType[]>({
    url: '/api/boards',
  });
};

const getAllMembers = (id: number) => {
  return useFetchWrap<BoardMemberType[]>({
    url: `/api/boards/${id}/members`,
  });
};

const addMember = (id: number, userId: number) => {
  return useFetchWrap({
    url: `/api/boards/${id}/members`,
    fetchOptions: {
      method: 'post',
      body: {
        userId,
      },
    },
  });
};

const deleteMember = (id: number, userId: number) => {
  return useFetchWrap({
    url: `/api/boards/${id}/members/${userId}`,
    fetchOptions: {
      method: 'delete',
    },
  });
};

const add = (body: BoardCreateType) => {
  return useFetchWrap<BoardCreateType>({
    url: '/api/boards',
    fetchOptions: {
      method: 'post',
      body,
    },
  });
};

const drop = async (id: number) => {
  return useFetchWrap({
    url: `/api/boards/${id}`,
    fetchOptions: {
      method: 'delete',
    },
  });
};

export const boardsApi = {
  getAll,
  add,
  drop,
  getAllMembers,
  addMember,
  deleteMember,
};
