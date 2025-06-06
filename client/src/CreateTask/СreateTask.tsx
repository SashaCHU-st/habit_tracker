import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [task, setTask] = useState("");
  const [task_start, settask_start] = useState("");
  const [task_end, settask_end] = useState("");
  const [err, setError] = useState("")
  const navigate = useNavigate();

  const addTask = async (event: React.FormEvent) => {
    // console.log("ID=>", user_id);
    event.preventDefault();
    try
    {
      const user_id = localStorage.getItem("id");
      console.log("UUU=>", user_id)
      const fetchData = await fetch(`http://localhost:3001/createTask`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          task,
          task_start,
          task_end,
        }),
      });
      const responseData = await fetchData.json();
      console.log(responseData);
      if (!fetchData.ok) {
        throw new Error(responseData.message);
      }
      localStorage.setItem("task_id", responseData.task_id)
      navigate('/myTasks')
      
    }
     catch (error: any) {
        setError(error.message || "Login failed");
      }
    };

  const myTasks = (event: React.FormEvent)=>
  {
    event.preventDefault()
    navigate("/myTasks")
  }
  return (
    <div>
      <form action="" onSubmit={addTask}>
        {err && <p className="text-red-500">{err}</p>}
        <div className="flex flex-col items-center">
          <label className="bg-sky-50">Task</label>
          <input
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label className="bg-sky-50">Start Date</label>
          <input
            type="date"
            name="task_start"
            id="task_start"
            value={task_start}
            onChange={(e) => settask_start(e.target.value)}
          />
          {/* <br /> */}
        </div>
        <div className="flex flex-col items-center">
          <label className="bg-sky-50">End Date</label>
          <input
            type="date"
            name="task_end"
            id="task_end"
            value={task_end}
            onChange={(e) => settask_end(e.target.value)}
          />
        </div>
        <button
          className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="submit"
          value="Submit"
        >
          {" "}
          Add task
        </button>
        <button
        className="block mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={myTasks}
        > See all my tasks</button>
      </form>
    </div>
  );
};

export default CreateTask;
