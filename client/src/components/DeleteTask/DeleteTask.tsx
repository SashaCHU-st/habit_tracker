interface DeleteTaskProps {
  task_id: number;
  task: string;
  onDelete: (id: number) => void;
}

const DeleteTask = ({ task_id, task, onDelete }: DeleteTaskProps) => {
  const deleteT = async () => {
    try {
      const fetchData = await fetch(`http://localhost:3001/deleteTask`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ task_id, task }),
      });

      const responseData = await fetchData.json();

      if (!fetchData.ok) {
        throw new Error(responseData.message);
      }
      onDelete(task_id);
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="text-right">
      <button
        className="ml-auto mx-auto w-36 mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={deleteT}
      >
        Delete Task
      </button>
    </div>
  );
};

export default DeleteTask;
