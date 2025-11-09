export type Task = {
  id: string;
  name: string;
  userId?: string;
  createdAt?: string;
};

export type CreateTaskRequest = {
  name: string;
};
