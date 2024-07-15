import { useFetchWrap } from '#shared/api/useFetchWrap';

const getAll = async (boardId: number, columnId: number) => {
  return useFetchWrap<TaskType[]>({
    url: `/api/boards/${boardId}/columns/${columnId}/tasks`,
  });
};

const add = async (boardId: number, columnId: number, body: TaskCreateType) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns/${columnId}/tasks`,
    fetchOptions: {
      method: 'post',
      body: body,
    },
  });
};

const drop = async (id: number, boardId: number, columnId: number) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns/${columnId}/tasks/${id}`,
    fetchOptions: {
      method: 'delete',
    },
  });
};

const edit = async (id: number, body: TaskCreateType, boardId: number, columnId: number) => {
  return useFetchWrap({
    url: `/api/boards/${boardId}/columns/${columnId}/tasks/${id}`,
    fetchOptions: {
      method: 'patch',
      body,
    },
  });
};

export const tasksApi = {
  getAll,
  add,
  drop,
  edit,
};
