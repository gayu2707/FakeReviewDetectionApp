import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Method from "./pages/Method";
import Comparison from "./pages/Comparison";
import History from "./pages/History";
import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/method/:name" element={<Method />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/history" element={<History />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;