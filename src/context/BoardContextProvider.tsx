import { createContext, FC, ReactNode, useState } from "react";
import { BoardColumn } from "../types/types";

type ReportProviderProps = {
  children: ReactNode;
};

const DEFAULT_COLUMNS: BoardColumn[] = [
  {
    name: "To do",
    tasks: [
      {
        description: "Finish Board for today",
        draggableId: "0",
        name: "Task-1",
        status: "To do",
        taskId: "Task-1",
      },
      {
        description: "",
        draggableId: "1",
        name: "Task-2",
        status: "To do",
        taskId: "Task-2",
      },
    ],
  },
  {
    name: "In Progress",
    tasks: [],
  },
  {
    name: "Done",
    tasks: [],
  },
];

const DEFAULT_CONTEXT_VALUES = {
  columns: DEFAULT_COLUMNS,
  isSnackBarOpen: true,
  setIsSnackBarOpen: () => {
    //
  },
  setColumns: () => {
    //
  },
};

export interface BoardContextInterface {
  columns: BoardColumn[];
  isSnackBarOpen: boolean;
  setColumns: (columns: BoardColumn[]) => void;
  setIsSnackBarOpen: (isSnackBarOpen: boolean) => void;
}

export const BoardContext = createContext<BoardContextInterface>(
  DEFAULT_CONTEXT_VALUES
);

const BoardProvider: FC<ReportProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState<boolean>(false);

  return (
    <BoardContext.Provider
      value={{
        columns,
        isSnackBarOpen,
        setColumns,
        setIsSnackBarOpen,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
