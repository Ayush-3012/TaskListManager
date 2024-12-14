import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nextId, setNextId] = useState(21);

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
    { title: "Task ID", field: "id", width: 80, responsive: 0 },
    { title: "Title", field: "title", editor: "input", minWidth: 150 },
    {
      title: "Description",
      field: "description",
      editor: "textarea",
      minWidth: 200,
    },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
      minWidth: 120,
    },
    {
      title: "Actions",
      field: "actions",
      formatter: () =>
        "<div class='flex items-center justify-center'><button class='bg-red-400 rounded hover:bg-red-600 p-1 text-white font-bold'>Delete</button></div>",
      width: 100,
      responsive: 0,
      cellClick: (e, cell) => handleDeleteTask(cell.getRow().getData().id),
    },
  ];

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: nextId };
    setTasks((prev) => [...prev, taskWithId]);
    setNextId((prev) => prev + 1);
    setIsDialogOpen(false);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  return (
    <div className="font-serif">
      <h1 className="text-2xl font-bold mb-4 rounded-t-xl text-center text-white py-2 bg-slate-800">
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

      {/* Responsive Tabulator Table */}
      <div className="w-full h-[400px] overflow-x-auto overflow-y-auto px-6">
        <ReactTabulator
          data={filteredTasks}
          columns={columns}
          layout="fitColumns"
          options={{
            movableColumns: true,
            resizableColumns: true,
            responsiveLayout: "collapse",
          }}
          className="mb-8"
        />
      </div>

      <div className="bg-slate-800 rounded-b-xl w-full flex mt-2 py-2 items-center justify-center">
        <motion.button
          className="bg-blue-600 font-bold text-white px-8 py-1 rounded hover:bg-fuchsia-500 "
          onClick={() => setIsDialogOpen(true)}
          whileHover={{translateY: '-5px'}}
        >
          Add New Task
        </motion.button>
      </div>
      {isDialogOpen && (
        <AddTaskForm
          onClose={() => setIsDialogOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskTable;
