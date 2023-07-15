import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import InfoIcon from "@mui/icons-material/Info";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

interface TaskCardProps {
  taskId: string;
  name: string;
  draggableId: string;
}

const TaskCard = ({ taskId, draggableId, name }: TaskCardProps) => {
  const [taskName, setTaskName] = useState<string>(name);
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);
  return (
    <Draggable draggableId={draggableId} index={Number(draggableId)}>
      {(provided) => {
        return (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="m-2 flex flex-row p-4 pl-2 w-full hover:bg-sky-100 items-center "
            ref={provided.innerRef}
          >
            <DragIndicatorIcon
              className="mr-2 text-gray-400"
              fontSize="large"
            />
            <div>
              {isEditingTaskName ? (
                <TextField className="bg-white w-32" size="small" />
              ) : (
                <p className="font-oswald font-bold text-xl mb-0">{taskName}</p>
              )}
              <p className="text-xs">ID: {taskId}</p>
            </div>
            <div className="ml-auto">
              <InfoIcon className="mr-2 cursor-pointer text-gray-400 hover:text-gray-600" />
              <IconButton
                onClick={() => setIsEditingTaskName(true)}
                className="mr-1"
              >
                <EditIcon className=" text-gray-400 hover:text-gray-600" />
              </IconButton>
              <MoreHorizIcon
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                fontSize="large"
              />
            </div>
          </Paper>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
