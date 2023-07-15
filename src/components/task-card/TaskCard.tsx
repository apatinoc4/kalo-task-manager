import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import InfoIcon from "@mui/icons-material/Info";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DetailsModal from "./modals/DetailsModal";
import EditField from "./modals/EditFIeld";

interface TaskCardProps {
  taskId: string;
  name: string;
  draggableId: string;
  taskDescription: string;
}

const TaskCard = ({
  taskId,
  taskDescription,
  draggableId,
  name,
}: TaskCardProps) => {
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  return (
    <>
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
                  <EditField
                    textValue={name}
                    styles="bg-white w-24 h-5"
                    size="small"
                    setIsEditingField={setIsEditingTaskName}
                    taskId={taskId}
                  />
                ) : (
                  <p className="font-oswald font-bold text-l mb-0">{name}</p>
                )}
                <p className="text-xs">ID: {taskId}</p>
              </div>
              <div className="ml-auto items-center flex flex-col xl:flex-row ">
                <IconButton
                  onClick={() => setIsDetailsModalOpen(true)}
                  className="xl:mr-2"
                >
                  <InfoIcon className=" text-gray-400 hover:text-gray-600" />
                </IconButton>

                <IconButton
                  onClick={() => setIsEditingTaskName(true)}
                  className="xl:mr-1"
                >
                  <EditIcon className=" text-gray-400 hover:text-gray-600" />
                </IconButton>
                <IconButton>
                  <MoreHorizIcon className=" text-gray-400 hover:text-gray-600" />
                </IconButton>
              </div>
            </Paper>
          );
        }}
      </Draggable>
      <DetailsModal
        isOpen={isDetailsModalOpen}
        setIsOpen={setIsDetailsModalOpen}
        taskName={name}
        taskDescription={taskDescription}
        taskId={taskId}
      />
    </>
  );
};

export default TaskCard;
