import { useState, useContext } from "react";
import TaskCard from "./task-card/TaskCard";
import { Droppable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { BoardContext } from "../context/BoardContextProvider";

import { Task } from "../types/types";

interface BoardColumnProps {
  taskCount: number;
  setTaskCount: (taskCount: number) => void;
  droppableId: number;
  name: string;
  tasks: Task[];
}

const BoardColumn = ({
  droppableId,
  name,
  tasks,
  taskCount,
  setTaskCount,
}: BoardColumnProps) => {
  const { columns, setColumns } = useContext(BoardContext);
  const [columnName, setColumnName] = useState<string>(name);
  const [isEditingColumnName, setIsEditingColumnName] =
    useState<boolean>(false);

  console.log(columns);

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
        },
      ],
    };

    setColumns(columnsCopy);
    setTaskCount(taskCount + 1);
  };

  return (
    <Box className="bg-gray-100 flex flex-col m-4 h-full w-2/3 p-4 rounded  ">
      <div className="flex justify-between mb-2">
        <h2 onClick={() => console.log("hello")}>{columnName}</h2>
        <IconButton onClick={() => createNewTask()} className="mr-1">
          <AddIcon className=" text-gray-400 hover:text-gray-600" />
        </IconButton>
      </div>
      <Droppable droppableId={String(droppableId)}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" bg-slate-200 flex justify-center items-center flex-col overflow-y-auto overflow-x-hidden h-96 p-4 rounded-md"
            >
              {tasks.map((task) => (
                <TaskCard
                  name={task.name}
                  key={task.draggableId}
                  taskId={task.taskId}
                  taskDescription={task.description}
                  draggableId={task.draggableId}
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
