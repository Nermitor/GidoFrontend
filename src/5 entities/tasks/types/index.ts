import type { UploadFile } from 'element-plus';

export type TaskType = {
  id: number;
  photos?: string[];
  name: string;
  description?: string;
  deadline?: string;
  owner_id: number;
  column_id: number;
  timestamps: string;
  statusId?: number;
  recepientId?: number;
};

export type TaskCreateRequestType = Pick<TaskType, 'name' | 'description' | 'deadline' | 'statusId' | 'recepientId'> & {
  files?: UploadFile[];
};

export type TaskUpdateRequestType = Pick<
  TaskCreateRequestType,
  'name' | 'description' | 'deadline' | 'statusId' | 'files'
> & {
  deletedImagesId?: number[];
};
