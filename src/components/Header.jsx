import { motion } from "framer-motion";

const Header = () => {
  const today = new Date().toLocaleString("en-IN", {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  });
  return (
    <motion.div
      className="text-xl bg-slate-800 self-stretch mx-10 font-mono font-bold text-slate-100 py-4 rounded-md text-center"
      animate={{
        x: [100, 50, 0, -10, 0],
      }}
      transition={{ duration: 0.8 }}
    >
      <h4>{today}</h4>
    </motion.div>
  );
};

export default Header;
