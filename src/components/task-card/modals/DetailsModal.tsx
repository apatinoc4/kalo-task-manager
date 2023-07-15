import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

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
  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <Box className="w-96 h-96 p-6">
        <p className="font-bold text-4xl">{taskName}</p>
        <p>Status:</p>
        <p>ID: {taskId}</p>
        <p>Created by: User</p>
        <p>Description:</p>
        <Box className="bg-slate-400 h-24">
          <p>{taskDescription}</p>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DetailsModal;
