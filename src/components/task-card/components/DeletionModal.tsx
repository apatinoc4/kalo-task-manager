import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { BoardContext } from "../../../context/BoardContextProvider";
import { BoardColumn, Task } from "../../../types/types";

interface DeletionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  taskId: string;
}

const DeletionModal = ({ setIsOpen, isOpen, taskId }: DeletionModalProps) => {
  const { setColumns, setIsSnackBarOpen } = useContext(BoardContext);

  const deleteTask = () => {
    setColumns((prevColumns: BoardColumn[]) => {
      const updatedColumns = prevColumns.map((column: BoardColumn) => {
        const updatedTasks = column.tasks.filter(
          (task: Task) => task.taskId !== taskId
        );
        return { ...column, tasks: updatedTasks };
      });

      return updatedColumns;
    });
  };

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <Box className="h-40 p-6 w-96">
        <p className="font-bold text-4xl">Are you Sure?</p>
        <p className="mt-2">This Action can't be undone</p>
        <div className="flex justify-end w-full">
          <IconButton
            className="mr-1"
            onClick={() => {
              setIsSnackBarOpen(true);
              deleteTask();
            }}
            size="medium"
          >
            <CheckIcon className="bg-teal-300 rounded-full text-white" />
          </IconButton>
          <IconButton onClick={() => setIsOpen(false)} size="medium">
            <ClearIcon className="bg-slate-500 color-white rounded-full text-white" />
          </IconButton>
        </div>
      </Box>
    </Dialog>
  );
};

export default DeletionModal;
