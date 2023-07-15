import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { BoardContext } from "../context/BoardContextProvider";
import TaskCard from "./task-card/TaskCard";

import { Task } from "../types/types";

interface BoardColumnProps {
  droppableId: number;
  name: string;
  tasks: Task[];
  setTaskCount: (taskCount: number) => void;
  taskCount: number;
}

const BoardColumn = ({
  droppableId,
  name,
  tasks,
  setTaskCount,
  taskCount,
}: BoardColumnProps) => {
  const { columns, setColumns } = useContext(BoardContext);
  const [columnName, setColumnName] = useState<string>(name);
  const [isEditingColumnName, setIsEditingColumnName] =
    useState<boolean>(false);

  const createNewTask = () => {
    const columnsCopy = [...columns];

    columnsCopy[droppableId] = {
      name,
      tasks: [
        ...tasks,
        {
          taskId: `Task-${taskCount + 1}`,
          name: `Task-${taskCount + 1}`,
          draggableId: String(taskCount),
          description: "",
          status: name,
        },
      ],
    };

    setColumns(columnsCopy);
    setTaskCount(taskCount + 1);
  };

  return (
    <Box className="bg-gray-100 flex flex-col m-4 p-4 rounded w-2/3 h-full">
      <div className="flex justify-between mb-2">
        <h2 onClick={() => console.log("hello")}>{columnName}</h2>
        <IconButton className="mr-1" onClick={() => createNewTask()}>
          <AddIcon className="hover:text-gray-600 text-gray-400" />
        </IconButton>
      </div>
      <Droppable droppableId={String(droppableId)}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-slate-200 flex justify-center items-center flex-col h-96 overflow-x-hidden overflow-y-auto p-4 rounded-md"
            >
              {tasks.map((task) => (
                <TaskCard
                  draggableId={task.draggableId}
                  key={task.draggableId}
                  name={task.name}
                  taskDescription={task.description}
                  taskId={task.taskId}
                  taskStatus={name}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Box>
  );
};

export default BoardColumn;
