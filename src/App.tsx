import TaskBoard from "./components/TaskBoard";
import BoardProvider from "./context/BoardContextProvider";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <div className="flex items-center lg:h-screen">
      <BoardProvider>
        <StyledEngineProvider injectFirst>
          <TaskBoard />
        </StyledEngineProvider>
      </BoardProvider>
    </div>
  );
}

export default App;
