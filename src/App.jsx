import { TaskProvider } from "./contexts/TaskContext";
import Header from "./components/Header";
import Date from "./components/Date";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Toaster } from "react-hot-toast";
import CarryoverBtn from "./components/CarryoverBtn";

function App() {
  return (
    <TaskProvider>
      <div>
        <Toaster />
      </div>

      <main className="main-theme">
        <div className="app">
          <Header />
          <Date />
          <TaskInput />
          <CarryoverBtn />
          <TaskList />
        </div>
      </main>
    </TaskProvider>
  );
}

export default App;
