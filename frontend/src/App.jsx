import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Method from "./pages/Method";
import Comparison from "./pages/Comparison";
import History from "./pages/History";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Help from "./pages/Help";
import Support from "./pages/Support";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/method/:name" element={<Method />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/history" element={<History />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <main className="page-content">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;