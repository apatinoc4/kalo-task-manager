import { useContext, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import BoardColumn from "./BoardColumn";
import Paper from "@mui/material/Paper";
import { BoardContext } from "../context/BoardContextProvider";
import { BoardColumn as BoardColumnType } from "../types/types";

const onDragEnd = (
  result: DropResult,
  columns: BoardColumnType[],
  setColumns: (columns: BoardColumnType[]) => void
) => {
  const { source, destination } = result;
  if (destination) {
    const updatedDroppables = [...columns];

    const sourceDroppable = updatedDroppables[+source.droppableId];
    const destDroppable = updatedDroppables[+destination.droppableId];
    const sourceItems = sourceDroppable?.tasks;
    const destItems = destDroppable?.tasks;

    console.log(sourceItems, destItems, "SRC DEST");
    const [draggedElement] = sourceItems.splice(source.index, 1);
    console.log(draggedElement);

    if (source.droppableId !== destination.droppableId) {
      destItems.splice(destination.index, 0, draggedElement);
    } else {
      sourceItems.splice(destination.index, 0, draggedElement);
    }
    setColumns(updatedDroppables);
  }
};

const TaskBoard = () => {
  const { columns, setColumns } = useContext(BoardContext);
  const [taskCount, setTaskCount] = useState<number>(2);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="p-8 w-full">
        <Paper className="flex flex-col h-full justify-center items-center">
          <p className="font-bold">Board</p>
          <div className="flex flex-row h-full p-4 w-full">
            {columns.map((column, idx) => (
              <BoardColumn
                droppableId={idx}
                key={idx}
                name={column.name}
                taskCount={taskCount}
                setTaskCount={setTaskCount}
                tasks={column.tasks}
              />
            ))}
          </div>
        </Paper>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
