import TaskBoard from "./components/TaskBoard";
import BoardProvider from "./context/BoardContextProvider";
import { StyledEngineProvider } from "@mui/material";

function App() {
  return (
    <>
      <BoardProvider>
        <StyledEngineProvider injectFirst>
          <TaskBoard />
        </StyledEngineProvider>
      </BoardProvider>
    </>
  );
}

export default App;
