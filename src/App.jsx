import Header from "./components/Header";
import Home from "./components/Home";
import { motion } from "framer-motion";

const App = () => {
  return (
    <motion.div
      className="flex flex-col gap-8 py-4 items-center bg-emerald-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <Home />
    </motion.div>
  );
};

export default App;
