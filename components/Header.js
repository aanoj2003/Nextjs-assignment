import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Header({ toggleDark, toggleSidebar, dark }) {
  return (
    <motion.header 
      className="header"
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* LEFT SECTION */}
      <div className="headerLeft">
        <motion.button 
          className="menuBtn" 
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBars />
        </motion.button>

        <motion.h1 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          📚 Blog Hub
        </motion.h1>
      </div>

      {/* RIGHT SECTION */}
      <div className="headerRight">
        <motion.button 
          onClick={toggleDark} 
          className="darkBtn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title={dark ? "Light Mode" : "Dark Mode"}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </motion.button>
      </div>

    </motion.header>
  );
}