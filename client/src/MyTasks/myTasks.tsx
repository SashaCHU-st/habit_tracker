import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import DeleteTask from "../components/DeleteTask/DeleteTask";
import { getDatesInRange } from "../utils/dateRange";
import { waitFor } from "@testing-library/react";
import CheckTask from "../CheckTask/CheckTask";

interface Tasks {
  id: number;
  user_id: number;
  task: string;
  task_start: string;
  task_end: string;
  how_many_days: number;
}
interface TasksWithDates extends Tasks {
  datesInRange: Date[];
}

const MyTasks = () => {
  const [tasks, setTasks] = useState<TasksWithDates[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<number>(11);
  const [year, setYear] = useState<number>(2025);
  const navigate = useNavigate();
  useEffect(() => {
    const getTasks = async () => {
      const user_id = localStorage.getItem("id");
      const fetchData = await fetch(`http://localhost:3001/myTasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id,
        }),
      });
      const responseData = await fetchData.json();
      console.log("responseData.tasks:", responseData.tasks);
      if (!fetchData.ok) {
        throw new Error(responseData.message);
      }
      const tasksWithDates = responseData.tasks.map((task: Tasks) => ({
        ...task,
        datesInRange: getDatesInRange(task.task_start, task.task_end),
      }));
      setTasks(tasksWithDates);

      const allDates: Date[] = [];
      responseData.tasks.forEach((task: Tasks) => {
        const range = getDatesInRange(task.task_start, task.task_end); // get Range of dates
        allDates.push(...range); // add to main array
      });
      setHighlightedDates(allDates);
      if (allDates.length > 0) {
        setMonth(allDates[0].getMonth());
        setYear(allDates[0].getFullYear());
      }
    };
    getTasks();
  }, []);

  const backToTasks = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/createTask");
  };
  const handleDelete = (deletedId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== deletedId));
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div>
      {tasks.map((task) => {
        const month = new Date(task.task_start).getMonth();
        const year = new Date(task.task_start).getFullYear();
        return (
          <div key={task.id} style={{ marginBottom: "20px" }}>
            <h2>{task.task}</h2>
            <h3>
              {monthNames[month]} {year}
            </h3>
            <CheckTask task_id={task.id} />
            <DeleteTask
              task_id={task.id}
              task={task.task}
              onDelete={handleDelete}
            />
          </div>
        );
      })}
      <button
        className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={backToTasks}
      >
        Back to create Tasks
      </button>
    </div>
  );
};

export default MyTasks;
