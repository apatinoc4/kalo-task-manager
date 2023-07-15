import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";

import { BoardContext } from "../../../context/BoardContextProvider";

interface EditFieldProps {
  fieldName: string;
  textValue: string;
  styles?: string;
  size?: "small" | "medium";
  setIsEditingField: (isEditingField: boolean) => void;
  taskId: string;
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
    <div className="flex items-start relative z-10">
      {multiline ? (
        <textarea
          value={placeHolderValue}
          className={clsx("bg-slate-100 edit-field", styles, "resize-none")}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPlaceHolderValue(e.target.value)
          }
        />
      ) : (
        <input
          value={placeHolderValue}
          className={clsx("bg-slate-100 edit-field", styles)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlaceHolderValue(e.target.value)
          }
        />
      )}
      <div className="absolute right-0 top-6 flex flex-row my-2">
        <IconButton onClick={onConfirm} className="mr-1" size="small">
          <CheckIcon className="bg-green-600 rounded-full text-white" />
        </IconButton>
        <IconButton onClick={onDiscard} size="small">
          <ClearIcon className="bg-red-500 color-white rounded-full text-white" />
        </IconButton>
      </div>
    </div>
  );
};

export default EditField;
