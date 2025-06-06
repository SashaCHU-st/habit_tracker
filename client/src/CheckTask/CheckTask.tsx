import React from "react";
import { useNavigate } from "react-router-dom";

interface CheckTaskProps {
  task_id: number;
}

const CheckTask: React.FC<CheckTaskProps> = ({ task_id }) => {
  const navigate = useNavigate();

  const handleCheckTask = async () => {
    try {
      const response = await fetch(`http://localhost:3001/myTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message );
      }

      navigate(`/calendar/${task_id}`);
    } catch (error: any) {
      console.error("Fetch error:", error.message || error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="w-36 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleCheckTask}
      >
        Check Task
      </button>
    </div>
  );
};

export default CheckTask;
