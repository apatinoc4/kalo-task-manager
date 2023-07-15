import BoardColumn from "../board-column/BoardColumn";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Paper from "@mui/material/Paper";

import "./TaskBoard.scss";

const DEFAULT_COLUMNS = [
  {
    name: "To do",
    tasks: [
      { taskId: "Task-1", name: "Task-1", draggableId: "0" },
      { taskId: "Task-2", name: "Task-2", draggableId: "1" },
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

const onDragEnd = (result: DropResult, columns, setColumns) => {
  const { source, destination } = result;
  if (destination) {
    let updatedDroppables = [...columns];

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
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [taskCount, setTaskCount] = useState<number>(2);

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="w-full p-8">
        <Paper className="flex justify-center items-center h-96 flex-col ">
          <p className="font-bold">Board</p>
          <div className="flex flex-row w-full">
            {columns.map(({ name, tasks }, idx) => (
              <BoardColumn
                taskCount={taskCount}
                setTaskCount={setTaskCount}
                columns={columns}
                setColumns={setColumns}
                droppableId={idx}
                key={idx}
                name={name}
                tasks={tasks}
              />
            ))}
          </div>
        </Paper>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
