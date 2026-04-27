import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Scale,
  History,
  FileText,
  Info,
  HelpCircle,
  LifeBuoy
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        Review<span>AI</span>
      </div>

      <nav className="sidebar-nav">

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/" end className="nav-link">
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/comparison" className="nav-link">
            <Scale size={20} />
            Compare
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/history" className="nav-link">
            <History size={20} />
            History
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/reports" className="nav-link">
            <FileText size={20} />
            Reports
          </NavLink>
        </motion.div>

        <hr style={{ margin: "20px 0", opacity: 0.2 }} />

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/about" className="nav-link">
            <Info size={20} />
            About
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/help" className="nav-link">
            <HelpCircle size={20} />
            Help
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink to="/support" className="nav-link">
            <LifeBuoy size={20} />
            Support
          </NavLink>
        </motion.div>

      </nav>
    </aside>
  );
}

export default Sidebar;