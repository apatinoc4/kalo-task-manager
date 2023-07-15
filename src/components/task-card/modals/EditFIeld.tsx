import clsx from "clsx";
import { useState, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { BoardContext } from "../../../context/BoardContextProvider";

interface EditFieldProps {
  styles?: string;
  size?: "small" | "medium";
  textValue: string;
  setIsEditingField: (isEditingField: boolean) => void;
  taskId: string;
  fieldName: string;
  multiline?: boolean;
}

const EditField = ({
  fieldName,
  textValue,
  styles,
  setIsEditingField,
  taskId,
  multiline,
}: EditFieldProps) => {
  const { columns, setColumns } = useContext(BoardContext);
  const [placeHolderValue, setPlaceHolderValue] = useState<string>(textValue);

  const onConfirm = () => {
    const updatedColumns = columns.map((column) => {
      const updatedTasks = column.tasks.map((task) => {
        if (task.taskId === taskId) {
          return { ...task, [fieldName]: placeHolderValue };
        }
        return task;
      });
      return { ...column, tasks: updatedTasks };
    });

    setColumns(updatedColumns);
    setIsEditingField(false);
  };

  const onDiscard = () => {
    setIsEditingField(false);
  };
  return (
    <div className="flex items-start  z-10 relative">
      {multiline ? (
        <textarea
          value={placeHolderValue}
          className={(clsx("edit-field", styles), "bg-slate-100 resize-none")}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPlaceHolderValue(e.target.value)
          }
        />
      ) : (
        <input
          value={placeHolderValue}
          className={(clsx("edit-field", styles), "bg-slate-100")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlaceHolderValue(e.target.value)
          }
        />
      )}
      <div className=" absolute right-0 top-6 flex flex-row my-2">
        <IconButton onClick={onConfirm} className="mr-1" size="small">
          <CheckIcon className=" text-white bg-green-600 rounded-full" />
        </IconButton>
        <IconButton onClick={onDiscard} size="small">
          <ClearIcon className=" text-white bg-red-500 rounded-full color-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default EditField;
