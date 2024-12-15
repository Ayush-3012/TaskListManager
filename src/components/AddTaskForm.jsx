/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";

const AddTaskForm = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description, status });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      animate={{ y: [-100, -50, 0, 10, 0] }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-slate-600 p-6 rounded shadow-md w-2/4 max-md:w-3/4 max-sm:w-5/6 max-sm:p-3">
        <h2 className="text-xl font-bold text-slate-50 mb-4">Add New Task</h2>
        {/* Form Input for new task */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-50 font-medium mb-2">Title</label>
            <input
              type="text"
              className="outline-none focus:ring focus:ring-gray-50 rounded w-full bg-slate-800 text-white p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-50 font-medium mb-2">
              Description
            </label>
            <textarea
              className="outline-none focus:ring focus:ring-gray-50 resize-none rounded w-full bg-slate-800 text-white p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-50 font-medium mb-2">
              Status
            </label>
            <select
              className="outline-none focus:ring focus:ring-gray-50 rounded w-full bg-slate-800 text-white p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              className="bg-rose-400 hover:bg-red-500 text-white px-4 py-2 rounded "
              onClick={onClose}
              whileHover={{ translateY: "-5px" }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="bg-teal-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              whileHover={{ translateY: "-5px" }}
            >
              Add Task
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTaskForm;
