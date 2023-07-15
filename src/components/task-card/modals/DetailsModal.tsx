import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import EditField from "./EditFIeld";

interface DetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  taskDescription: string;
  taskId: string;
  taskName: string;
  taskStatus: string;
}

const DetailsModal = ({
  isOpen,
  setIsOpen,
  taskDescription,
  taskId,
  taskName,
  taskStatus,
}: DetailsModalProps) => {
  const [isEditingTaskDesc, setIsEditingTaskDesc] = useState<boolean>(false);
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <Box className="w-96 h-96 p-6">
        {isEditingTaskName ? (
          <EditField
            fieldName="name"
            styles="text-lg"
            taskId={taskId}
            textValue={taskName}
            setIsEditingField={setIsEditingTaskName}
          />
        ) : (
          <div className="items-center flex flex-row mb-6">
            <p className="font-bold text-4xl">{taskName}</p>
            <IconButton
              className="ml-1"
              onClick={() => setIsEditingTaskName(true)}
            >
              <EditIcon className="hover:text-gray-600 text-gray-400" />
            </IconButton>
          </div>
        )}
        <p>
          <span className="font-semibold text-lg">ID:</span> {taskId}
        </p>
        <p>
          <span className="font-semibold text-lg">Status:</span> {taskStatus}
        </p>
        <p>
          <span className="font-semibold text-lg">Created by: </span>User
        </p>
        <div className="flex flex-row items-center">
          <p className="font-semibold text-lg">Description:</p>
          <IconButton onClick={() => setIsEditingTaskDesc(true)}>
            <EditIcon
              className="hover:text-gray-600 text-s text-gray-400"
              fontSize="small"
            />
          </IconButton>
        </div>

        <Box>
          {isEditingTaskDesc ? (
            <EditField
              fieldName="description"
              styles="w-10"
              taskId={taskId}
              textValue={taskDescription}
              setIsEditingField={setIsEditingTaskDesc}
              multiline
            />
          ) : (
            <p>{taskDescription}</p>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default DetailsModal;
