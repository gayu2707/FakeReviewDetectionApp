import { useEffect, useState } from "react";
import { fetchSummary, downloadReport } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Reports() {
  const [summary, setSummary] = useState({
    total_analyzed: 0,
    fake: 0,
    real: 0,
    suspicious: 0,
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    loadSummary();
  }, []);

  const pieData = [
    { name: "Fake", value: summary.fake },
    { name: "Real", value: summary.real },
    { name: "Suspicious", value: summary.suspicious },
  ];

  const barData = [
    { name: "Fake", count: summary.fake },
    { name: "Real", count: summary.real },
    { name: "Suspicious", count: summary.suspicious },
  ];

  const COLORS = ["#ff5b5b", "#27d49a", "#f7b731"];

  return (
    <div className="page">
      <h1 className="page-title">Reports</h1>

      <div className="report-card">
        <div>
          <h2>📄 Full Analysis Report</h2>
          <p>
            Download CSV file containing all analysis history including results,
            confidence scores, and detected indicators.
          </p>
        </div>
        <button className="primary-btn" onClick={downloadReport}>
          Download Report
        </button>
      </div>

      <div className="report-card">
        <div>
          <h2>📊 Summary Statistics</h2>
          <p>
            Total analyzed: <strong>{summary.total_analyzed}</strong> | Fake:{" "}
            <strong>{summary.fake}</strong> | Real: <strong>{summary.real}</strong> |
            Suspicious: <strong>{summary.suspicious}</strong>
          </p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Result Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Analysis Count</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="#9ca9c7" />
              <YAxis stroke="#9ca9c7" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4c86ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Reports;