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
        taskId: "Task-1",
        name: "Task-1",
        draggableId: "0",
        description: "Finish Board for today",
      },
      { taskId: "Task-2", name: "Task-2", draggableId: "1", description: "" },
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
  setColumns: () => {
    //
  },
};

export interface BoardContextInterface {
  columns: BoardColumn[];
  setColumns: (columns: BoardColumn[]) => void;
}

export const BoardContext = createContext<BoardContextInterface>(
  DEFAULT_CONTEXT_VALUES
);

const BoardProvider: FC<ReportProviderProps> = ({ children }) => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  return (
    <BoardContext.Provider
      value={{
        columns,
        setColumns,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
