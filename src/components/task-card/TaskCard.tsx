import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DetailsModal from "./modals/DetailsModal";
import EditField from "./modals/EditFIeld";

interface TaskCardProps {
  draggableId: string;
  name: string;
  taskId: string;
  taskDescription: string;
  taskStatus: string;
}

const TaskCard = ({
  draggableId,
  name,
  taskId,
  taskDescription,
  taskStatus,
}: TaskCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);

  return (
    <>
      <Draggable draggableId={draggableId} index={Number(draggableId)}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex flex-row items-center m-2 p-4 pl-2 w-full hover:bg-sky-100"
            ref={provided.innerRef}
          >
            <DragIndicatorIcon
              className="mr-2 text-gray-400"
              fontSize="large"
            />
            <div>
              {isEditingTaskName ? (
                <EditField
                  fieldName="name"
                  textValue={name}
                  styles="bg-white h-5 w-24"
                  size="small"
                  setIsEditingField={setIsEditingTaskName}
                  taskId={taskId}
                />
              ) : (
                <p className="font-bold font-oswald text-l mb-0">{name}</p>
              )}
              <p className="text-xs">ID: {taskId}</p>
            </div>
            <div className="ml-auto flex flex-col xl:flex-row items-center">
              <IconButton
                onClick={() => setIsDetailsModalOpen(true)}
                className="xl:mr-2"
              >
                <InfoIcon className="hover:text-gray-600 text-gray-400" />
              </IconButton>

              <IconButton
                onClick={() => setIsEditingTaskName(true)}
                className="xl:mr-1"
              >
                <EditIcon className="hover:text-gray-600 text-gray-400" />
              </IconButton>
              <IconButton>
                <MoreHorizIcon className="hover:text-gray-600 text-gray-400" />
              </IconButton>
            </div>
          </Paper>
        )}
      </Draggable>
      <DetailsModal
        isOpen={isDetailsModalOpen}
        setIsOpen={setIsDetailsModalOpen}
        taskName={name}
        taskStatus={taskStatus}
        taskDescription={taskDescription}
        taskId={taskId}
      />
    </>
  );
};

export default TaskCard;
