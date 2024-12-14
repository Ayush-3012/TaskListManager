import { motion } from "framer-motion";
import TaskTable from "./TaskTable";

const Home = () => {
  return (
    <motion.div
      className="bg-slate-300 rounded-xl max-w-full overflow-x-auto"
      initial="hidden"
      exit="exit"
      animate={{ x: [-100, -50, 0, 10, 0] }}
      transition={{ duration: 0.8 }}
    >
      <TaskTable />
    </motion.div>
  );
};

export default Home;
