import { useState } from "react";
import TaskCard from "../task-card/TaskCard";
import { Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

type Task = {
  taskId: string;
  name: string;
  draggableId: string;
};

interface BoardColumnProps {
  taskCount: number;
  setTaskCount: any;
  columns: any;
  setColumns: any;
  droppableId: number;
  name: string;
  tasks: Task[];
}

const BoardColumn = ({
  columns,
  setColumns,
  droppableId,
  name,
  tasks,
  taskCount,
  setTaskCount,
}: BoardColumnProps) => {
  const [columnName, setColumnName] = useState<string>(name);
  const [isEditingColumnName, setIsEditingColumnName] =
    useState<boolean>(false);

  const createNewTask = () => {
    const columnsCopy = [...columns];

    columnsCopy[+droppableId] = {
      name,
      tasks: [
        ...tasks,
        {
          taskId: `Task-${taskCount + 1}`,
          name: `Task-${taskCount + 1}`,
          draggableId: String(taskCount),
        },
      ],
    };

    setColumns(columnsCopy);
    setTaskCount(taskCount + 1);
  };

  return (
    <Droppable droppableId={String(droppableId)}>
      {(provided, snapshot) => {
        return (
          <Box
            {...provided.droppableProps}
            className="bg-gray-100 flex flex-col m-4  h-full w-1/2 p-4 rounded overflow-y-auto"
            ref={provided.innerRef}
          >
            <div className="flex justify-between">
              <h2 onClick={() => console.log("hello")}>{columnName}</h2>
              <AddIcon
                className="hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => createNewTask()}
              />
            </div>
            <div className="flex justify-center items-center flex-col">
              {tasks.map((task) => (
                <TaskCard
                  name={task?.name}
                  key={task.draggableId}
                  taskId={task.taskId}
                  draggableId={task.draggableId}
                />
              ))}
              {provided.placeholder}
            </div>
          </Box>
        );
      }}
    </Droppable>
  );
};

export default BoardColumn;
