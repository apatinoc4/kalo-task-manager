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
        description:
          "Finish Board for today, who tought beautiful dnd would betray me?",
        draggableId: "0",
        name: "Finish Board",
        status: "To do",
        taskId: "Task-1",
      },
    ],
  },
  {
    name: "In Progress",
    tasks: [
      {
        description: "Using Vercel babyyyyy",
        draggableId: "1",
        name: "Deploy The App",
        status: "To do",
        taskId: "Task-2",
      },
    ],
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
