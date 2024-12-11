import Header from "./components/Header";
import Home from "./components/Home";
import { motion } from "framer-motion";

const App = () => {
  return (
    <motion.div
      className="flex flex-col gap-8 py-4 h-screen overflow-hidden items-center bg-purple-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <Home />
    </motion.div>
  );
};

export default App;
