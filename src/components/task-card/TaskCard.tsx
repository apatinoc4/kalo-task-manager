import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DetailsModal from "./components/DetailsModal";
import EditField from "./components/EditFIeld";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DeletionModal from "./components/DeletionModal";

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
  const [isDeletionModalOpen, setIsDeletionModalOpen] =
    useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);

  return (
    <>
      <Draggable draggableId={draggableId} index={Number(draggableId)}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="box-border flex flex-row items-center my-2 p-4 pl-2 w-full hover:bg-teal-100"
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
                  setIsEditingField={setIsEditingTaskName}
                  size="small"
                  styles="bg-slate-200 h-5 w-36"
                  taskId={taskId}
                  textValue={name}
                />
              ) : (
                <p className="font-bold font-oswald mb-0 text-l">{name}</p>
              )}
              <p className="text-xs">ID: {taskId}</p>
            </div>
            <div className="flex flex-col items-center ml-auto xl:flex-row">
              <Tooltip placement="right" title="Task Details">
                <IconButton
                  className="xl:mr-2"
                  onClick={() => setIsDetailsModalOpen(true)}
                >
                  <InfoIcon className="hover:text-gray-600 text-teal-300" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Edit Name">
                <IconButton
                  className="xl:mr-1"
                  onClick={() => setIsEditingTaskName(true)}
                >
                  <EditIcon className="hover:text-gray-600 text-teal-300" />
                </IconButton>
              </Tooltip>
              <Tooltip placement="right" title="Delete Task">
                <IconButton onClick={() => setIsDeletionModalOpen(true)}>
                  <DeleteIcon className="hover:text-gray-600 text-teal-300" />
                </IconButton>
              </Tooltip>
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
      <DeletionModal
        isOpen={isDeletionModalOpen}
        setIsOpen={setIsDeletionModalOpen}
        taskId={taskId}
      />
    </>
  );
};

export default TaskCard;
