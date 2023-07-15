import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditField from "./EditFIeld";

interface DetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  taskName: string;
  taskDescription: string;
  taskId: string;
}

const DetailsModal = ({
  isOpen,
  setIsOpen,
  taskName,
  taskDescription,
  taskId,
}: DetailsModalProps) => {
  const [isEditingTaskName, setIsEditingTaskName] = useState<boolean>(false);
  const [isEditingTaskDesc, setIsEditingTaskDesc] = useState<boolean>(false);

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <Box className="w-96 h-96 p-6">
        {isEditingTaskName ? (
          <EditField
            fieldName="name"
            textValue={taskName}
            setIsEditingField={setIsEditingTaskName}
            taskId={taskId}
            styles="text-lg"
          />
        ) : (
          <div className="items-center flex flex-row mb-6">
            <p className="font-bold text-4xl">{taskName}</p>
            <IconButton
              onClick={() => setIsEditingTaskName(true)}
              className="ml-1"
            >
              <EditIcon className=" text-gray-400 hover:text-gray-600" />
            </IconButton>
          </div>
        )}
        <p className="text-lg font-semibold">Status:</p>
        <p>
          <span className="text-lg font-semibold">ID:</span> {taskId}
        </p>
        <p>
          <span className=" text-lg font-semibold">Created by: </span>User
        </p>
        <div className="items-center flex flex-row">
          <p className=" text-lg font-semibold">Description:</p>
          <IconButton onClick={() => setIsEditingTaskDesc(true)}>
            <EditIcon
              fontSize="small"
              className="text-s text-gray-400 hover:text-gray-600"
            />
          </IconButton>
        </div>

        <Box>
          {isEditingTaskDesc ? (
            <EditField
              fieldName="description"
              textValue={taskDescription}
              setIsEditingField={setIsEditingTaskDesc}
              styles="w-10"
              taskId={taskId}
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
