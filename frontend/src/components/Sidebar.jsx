import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        Review<span>AI</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-link">
          <span className="nav-icon">📊</span>
          Dashboard
        </NavLink>

        <NavLink to="/comparison" className="nav-link">
          <span className="nav-icon">⚖️</span>
          Compare
        </NavLink>

        <NavLink to="/history" className="nav-link">
          <span className="nav-icon">📜</span>
          History
        </NavLink>

        <NavLink to="/reports" className="nav-link">
          <span className="nav-icon">📄</span>
          Reports
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;