import Header from "./components/Header";
import Home from "./components/Home";
import { motion } from "framer-motion";

const App = () => {
  return (
    <motion.div
      className="flex flex-col gap-2 bg-fuchsia-100 py-2 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header />
      <Home />
    </motion.div>
  );
};

export default App;
