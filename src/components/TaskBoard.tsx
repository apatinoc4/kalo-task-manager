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

  // If the destination is null or the same as the source, do nothing
  if (
    !destination ||
    (source.droppableId === destination.droppableId &&
      source.index === destination.index)
  ) {
    return;
  }

  console.log("Source:", source);
  console.log("Destination:", destination);
  console.log("Columns:", columns);

  const sourceIndex = Number(source.droppableId);
  const destinationIndex = Number(destination.droppableId);
  const sourceColumn = columns[sourceIndex];
  const destinationColumn = columns[destinationIndex];
  const sourceItems = [...sourceColumn.tasks];

  if (sourceIndex === destinationIndex) {
    // Moving within the same column
    const [draggedElement] = sourceItems.splice(source.index, 1);
    sourceItems.splice(destination.index, 0, draggedElement);

    const updatedColumns = [...columns];
    updatedColumns[sourceIndex] = {
      ...sourceColumn,
      tasks: sourceItems,
    };

    setColumns(updatedColumns);
  } else {
    // Moving between different columns
    const destinationItems = [...destinationColumn.tasks];
    const draggedElementIndex = sourceItems.findIndex(
      (task) => task.draggableId === result.draggableId
    );

    if (draggedElementIndex !== -1) {
      const [draggedElement] = sourceItems.splice(draggedElementIndex, 1);
      destinationItems.splice(destination.index, 0, draggedElement);

      const updatedColumns = [...columns];
      updatedColumns[sourceIndex] = {
        ...sourceColumn,
        tasks: sourceItems,
      };
      updatedColumns[destinationIndex] = {
        ...destinationColumn,
        tasks: destinationItems,
      };

      setColumns(updatedColumns);
    }
  }

  console.log("Source Items after:", sourceItems);
  console.log("Destination Items after:", destinationColumn.tasks);
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
