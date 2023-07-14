import { useState } from "react";

interface BoardColumnProps {
  name: string;
}

const BoardColumn = ({ name }: BoardColumnProps) => {
  const [columnName, setColumnName] = useState<string>(name);
  const [isEditingColumnName, setIsEditingColumnName] =
    useState<boolean>(false);

  return (
    <div className="bg-slate-100 m-4 w-96 min-w-min p-4">
      <h2 onClick={() => console.log("hello")}>{columnName}</h2>
      <button>Create Task</button>
    </div>
  );
};

export default BoardColumn;
