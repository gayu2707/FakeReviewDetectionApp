import { Link } from "react-router-dom";

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

  return (
    <div className="page">
      <h1 className="page-title">Fake Review Detection</h1>
      <p className="page-subtitle">
        Analyze reviews using AI-powered detection methods
      </p>

      <div className="method-grid">
        {methods.map((method) => (
          <Link to={method.path} className="method-card" key={method.name}>
            <div className="method-icon">{method.icon}</div>
            <h2>{method.name}</h2>
            <p>{method.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;