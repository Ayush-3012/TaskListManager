import { motion } from "framer-motion";
import TaskTable from "./TaskTable";

const Home = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      className="bg-slate-300 p-2 flex gap-2 flex-col items-center rounded-xl"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8 }}
    >
      <div className="px-8 w-full overflow-y-scroll h-[500px]">
        <TaskTable />
      </div>
    </motion.div>
  );
};

export default Home;
