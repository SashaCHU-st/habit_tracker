import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "../Calendar/Calendar";

interface Task {
  id: number;
  task: string;
  task_start: string;
  task_end: string;
  task_days?: { date: string; status: number }[];
}

interface DateStatus {
  date: Date;
  status: number;
}

const CalendarPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [dateStatuses, setDateStatuses] = useState<DateStatus[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) {
      navigate("/myTasks");
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/task/${taskId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load task");

        setTask(data.task);

        const statuses = (data.task.task_days || []).map((item: any) => ({
          date: new Date(item.date),
          status: Number(item.status),
        }));
        setDateStatuses(statuses);
      } catch (error) {
        console.error("Error loading task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  const month = task ? new Date(task.task_start).getMonth() : 0;
  const year = task ? new Date(task.task_start).getFullYear() : 0;

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowStatusPicker(true);
  };

  const handleStatusSelect = async (status: string) => {
    if (!selectedDate || !task) return;

    try {
      const res = await fetch(`http://localhost:3001/newDay`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          task_id: task.id,
          date: selectedDate.toISOString(),
          status1: status,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const res2 = await fetch(`http://localhost:3001/task/${taskId}`);
      const freshData = await res2.json();

      setTask(freshData.task);
      setDateStatuses(
        (freshData.task.task_days || []).map((item: any) => ({
          date: new Date(item.date),
          status: Number(item.status ?? 0),
        }))
      );

      setShowStatusPicker(false);
      setSelectedDate(null);
    } catch (error) {
      console.error("Failed to save status:", error);
    }
  };

  const handleBack = () => {
    navigate("/myTasks");
  };

  if (loading) return <div>Loading task...</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="relative p-4">
      <h1 className="text-xl font-bold mb-4">{task.task}</h1>

      <Calendar
        month={month}
        year={year}
        highlightDates={dateStatuses}
        onDateClick={handleDateClick}
      />

      {showStatusPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md space-y-4 text-center">
            <h2 className="text-lg font-semibold mb-2">
              Choose status {selectedDate?.toDateString()}
            </h2>
            <div className="space-x-4">
              <button
                onClick={() => handleStatusSelect("0")}
                className="px-4 py-2 bg-red-600 rounded hover:bg-gray-300"
              >
                Very bad
              </button>
              <button
                onClick={() => handleStatusSelect("0.5")}
                className="px-4 py-2 bg-yellow-300 rounded hover:bg-yellow-400"
              >
                Small cheating
              </button>
              <button
                onClick={() => handleStatusSelect("1")}
                className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
              >
                All good
              </button>
            </div>
            <button
              onClick={() => setShowStatusPicker(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        className="mt-6 w-40 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        onClick={handleBack}
      >
        Back to all tasks
      </button>
    </div>
  );
};

export default CalendarPage;
