import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import { enqueueSnackbar } from "notistack";
import SearchTask from "./SearchTask";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [nextId, setNextId] = useState(21);
  const [statusCounts, setStatusCounts] = useState({
    "To Do": 0,
    "In Progress": 0,
    Done: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}`);
        const mappedTasks = Array.isArray(res?.data)
          ? res?.data?.slice(0, 20)?.map((task) => ({
              id: task.id,
              title: task.title,
              description: `Description for task ${task.id}`,
              status: task.completed ? "Done" : "To Do",
            }))
          : [];
        setTasks(mappedTasks);
        enqueueSnackbar("Fetched Tasks", { variant: "success" });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        enqueueSnackbar("Error while fetching task", { variant: "error" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const counts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { "To Do": 0, "In Progress": 0, Done: 0 }
    );
    setStatusCounts(counts);
  }, [tasks]);

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
      editor: "list",
      editorParams: {
        values: [
          { value: "To Do", label: "To Do" },
          { value: "In Progress", label: "In Progress" },
          { value: "Done", label: "Done" },
        ],
      },
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
    enqueueSnackbar("Task Deleted", { variant: "info" });
  };

  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: nextId };
    setTasks((prev) => [...prev, taskWithId]);
    setNextId((prev) => prev + 1);
    setIsDialogOpen(false);
    enqueueSnackbar("New Task Added", { variant: "success" });
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    enqueueSnackbar("Filtered Tasks", { variant: "success" });
  };

  const handleCellEdited = (cell) => {
    const updatedTask = cell.getData();
    setTasks((prevTasks) =>
      prevTasks?.map((task) =>
        task.id === updatedTask.id
          ? { ...task, status: updatedTask.status }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesSearch =
      task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.description.toLowerCase().includes(searchInput.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="font-serif bg-fuchsia-200">
      <h1 className="text-2xl font-bold rounded-t-xl text-center text-white py-4 bg-slate-800">
        Task List Manager
      </h1>

      {/* Task Counters */}
      <div className="bg-purple-500 font-semibold text-slate-50 mt-2 py-2 px-4 flex justify-between flex-wrap">
        <div>To Do: {statusCounts["To Do"]}</div>
        <div>In Progress: {statusCounts["In Progress"]}</div>
        <div>Done: {statusCounts["Done"]}</div>
      </div>

      {/* Filter Dropdown */}
      <div className="flex mt-1 bg-purple-500 justify-between items-center max-md:flex-col max-md:justify-center max-md:py-1">
        <div className="p-2 flex gap-2 items-center">
          <label className="font-bold">Filter by Status:</label>
          <select
            className="border rounded outline-none p-1"
            onChange={(e) => handleFilter(e.target.value)}
            value={filterStatus}
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <SearchTask searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>

      {/* Responsive Tabulator Table */}
      <div className="bg-purple-500 mt-1 py-2 overflow-x-auto overflow-y-auto px-4">
        <ReactTabulator
          data={filteredTasks}
          columns={columns}
          layout="fitColumns"
          options={{
            movableColumns: true,
            resizableColumns: true,
            responsiveLayout: "collapse",
          }}
          cellEdited={handleCellEdited}
          className="h-[400px] overflow-y-auto overflow-x-auto"
        />
      </div>

      {/* Add New Task button */}
      <div className="bg-slate-800 rounded-b-xl w-full flex mt-2 py-2 items-center justify-center">
        <motion.button
          className="bg-blue-600 font-bold text-white px-8 py-1 rounded hover:bg-fuchsia-500"
          onClick={() => setIsDialogOpen(true)}
          whileHover={{ translateY: "-5px" }}
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
