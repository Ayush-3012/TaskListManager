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
      className="bg-slate-300 rounded-xl"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8 }}
    >
      <TaskTable />
    </motion.div>
  );
};

export default Home;
