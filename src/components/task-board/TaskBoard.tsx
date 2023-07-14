import BoardColumn from "../board-column/BoardColumn";
import TaskCard from "../task-card/TaskCard";
import "./TaskBoard.scss";

const DEFAULT_COLUMNS = [
  {
    name: "To do",
  },
  {
    name: "In Progress",
  },
  {
    name: "Done",
  },
];
const TaskBoard = () => (
  <div className="flex justify-center items-center w-full bg-slate-300 h-96 flex-col">
    <p className="font-bold">Board</p>
    <div className="flex flex-row">
      {DEFAULT_COLUMNS.map(({ name }, idx) => (
        <BoardColumn key={idx} name={name} />
      ))}
    </div>
    <TaskCard />
  </div>
);

export default TaskBoard;
