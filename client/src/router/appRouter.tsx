import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../HomePage/Home";
import Profile from "../Profile/Profile";
import MyTasks from "../MyTasks/myTasks";
import Auth from "../Auth/Auth";
import CreateTask from "../CreateTask/СreateTask";
import CalendarPage from "../components/CalendarPage/CalendarPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="createTask" element={<CreateTask />} />
        <Route path="/myTasks" element={<MyTasks />} />
        <Route path="/calendar/:taskId" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
