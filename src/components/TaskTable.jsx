import { useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";
import axios from "axios";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}`);
        const mappedTasks = res?.data?.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: `Description for task ${task.id}`,
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: "Task ID", field: "id", width: 50, headerSort: false },
    { title: "Title", field: "title", editor: "input" },
    { title: "Description", field: "description", editor: "textarea" },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
    },
    {
      title: "Actions",
      field: "actions",
      formatter: () =>
        "<div class='flex items-center justify-center' ><button class='bg-red-400 hover:bg-red-600 p-1 text-white font-bold'>Delete</button></div>",
      width: 100,
      headerSort: false,
      cellClick: (e, cell) => handleDelete(cell.getRow().getData().id),
    },
  ];

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Add new task
  const handleAddTask = () => {
    const newTask = {
      // id: tasks.length + 1,
      // title: `New Task ${tasks.length + 1}`,
      // description: "New task description",
      // status: "To Do",
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Handle filter by status
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  // Filtered tasks
  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  return (
    <div className="font-serif">
      <h1 className="text-2xl font-bold mb-4 rounded-t-xl text-center text-white py-2 bg-slate-500">
        Task Manager
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-2 px-2 flex gap-2 items-center">
        <label className="font-bold">Filter by Status:</label>
        <select
          className="border p-1"
          onChange={(e) => handleFilter(e.target.value)}
          value={filterStatus}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Tabulator Table */}
      <div className="h-[400px] overflow-y-auto px-6">
        <ReactTabulator
          data={filteredTasks}
          columns={columns}
          layout="fitData"
          options={{
            movableColumns: true,
            resizableColumns: true,
          }}
          className="mb-8"
        />
      </div>

      {/* Add Task Button */}
      <div className="bg-slate-500 rounded-b-xl w-full flex mt-2 py-2 items-center justify-center">
        <button
          className="bg-blue-600 font-bold text-white px-4 py-1 rounded hover:bg-blue-800 "
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
