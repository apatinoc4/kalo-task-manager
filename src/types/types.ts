export type Task = {
  taskId: string;
  name: string;
  description: string;
  draggableId: string;
};

export type BoardColumn = {
  name: string;
  tasks: Task[];
};
