import { useFetchWrap } from '#shared/api/useFetchWrap';
import type { TaskCreateRequestType, TaskType, TaskUpdateRequestType } from '../types';
import type { UploadFile } from 'element-plus';

const makeTaskFormData = (body: TaskCreateRequestType | TaskUpdateRequestType) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(body)) {
    if (key === 'files') {
      for (const file of value as UploadFile[]) {
        if (file.raw) formData.append(key, file.raw);
      }
    } else if (key === 'deletedImagesId') {
      for (const id of value as number[]) {
        formData.append(key, id.toString());
      }
    } else {
      formData.set(key, value.toString());
    }
  }

  return formData;
};

const getAll = async (columnId: number) => {
  return useFetchWrap<TaskType[]>({
    url: `/api/columns/${columnId}/tasks`,
  });
};

const add = async (columnId: number, body: TaskCreateRequestType) => {
  return useFetchWrap<TaskType>({
    url: `/api/columns/${columnId}/tasks`,
    fetchOptions: {
      method: 'post',
      body: makeTaskFormData(body),
    },
  });
};

const drop = async (id: number, columnId: number) => {
  return useFetchWrap({
    url: `/api/columns/${columnId}/tasks/${id}`,
    fetchOptions: {
      method: 'delete',
    },
  });
};

const edit = async (id: number, columnId: number, body: TaskCreateRequestType) => {
  return useFetchWrap({
    url: `/api/columns/${columnId}/tasks/${id}`,
    fetchOptions: {
      method: 'patch',
      body: makeTaskFormData(body),
    },
  });
};

export const tasksApi = {
  getAll,
  add,
  drop,
  edit,
};
