import { useFetchWrap } from '#shared/api/useFetchWrap';
import type { ColumnCreateType, ColumnEditType, ColumnType } from './types';

const getAll = async (boardId: number) => {
  return useFetchWrap<ColumnType[]>({
    url: `/api/boards/${boardId}/columns`,
  });
};

const add = async (boardId: number, body: ColumnCreateType) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns`,
    fetchOptions: {
      method: 'post',
      body,
    },
  });
};

const drop = async (id: number, boardId: number) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns/${id}`,
    fetchOptions: {
      method: 'delete',
    },
  });
};

const edit = async (id: number, body: ColumnEditType, boardId: number) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns/${id}`,
    fetchOptions: {
      method: 'patch',
      body,
    },
  });
};

export const columnsApi = {
  getAll,
  add,
  drop,
  edit,
};

export const useColumnsApi = (boardId: number) => ({
  getAll: () => getAll(boardId),
  add: (body: ColumnCreateType) => add(boardId, body),
  drop: (id: number) => drop(id, boardId),
  edit: (id: number, body: ColumnEditType) => edit(id, body, boardId),
});
