import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

function Dashboard() {
  const methods = [
    {
      name: "VADER",
      desc: "Lexicon-based sentiment detection",
      icon: "📊",
      path: "/method/vader",
    },
    {
      name: "SHAP",
      desc: "Pattern-based explainability",
      icon: "🔎",
      path: "/method/shap",
    },
    {
      name: "HYBRID",
      desc: "Combined intelligent model",
      icon: "🤖",
      path: "/method/hybrid",
    },
  ];

  const stats = [
    {
      title: "Total Analyses",
      value: "124",
      icon: <BarChart3 size={20} />,
      className: "stat-blue",
    },
    {
      title: "Fake Reviews",
      value: "38",
      icon: <ShieldAlert size={20} />,
      className: "stat-red",
    },
    {
      title: "Real Reviews",
      value: "62",
      icon: <ShieldCheck size={20} />,
      className: "stat-green",
    },
    {
      title: "Suspicious",
      value: "24",
      icon: <AlertTriangle size={20} />,
      className: "stat-yellow",
    },
  ];

  const recentActivity = [
    { method: "VADER", result: "FAKE", confidence: "95%" },
    { method: "HYBRID", result: "SUSPICIOUS", confidence: "76%" },
    { method: "SHAP", result: "REAL", confidence: "42%" },
  ];

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="page-title">Fake Review Detection</h1>
      <p className="page-subtitle">
        Analyze reviews using AI-powered detection methods
      </p>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            className={`stat-card ${item.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon">{item.icon}</div>
            <div>
              <p className="stat-title">{item.title}</p>
              <h3 className="stat-value">{item.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="method-grid">
        {methods.map((method, index) => (
          <motion.div
            key={method.name}
            className="method-card-wrapper"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            <Link to={method.path} className="method-card">
              <div className="method-icon">{method.icon}</div>
              <h2>{method.name}</h2>
              <p>{method.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="recent-card">
        <h2>Recent Activity</h2>
        <div className="recent-list">
          {recentActivity.map((item, index) => (
            <div className="recent-item" key={index}>
              <span>{item.method}</span>
              <span>{item.result}</span>
              <span>{item.confidence}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;