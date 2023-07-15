export type Task = {
  taskId: string;
  name: string;
  description: string;
  draggableId: string;
  status: string;
};

export type BoardColumn = {
  name: string;
  tasks: Task[];
};
