import { useEffect, useState } from "react";
import { fetchSummary, downloadReport } from "../services/api";

function Reports() {
  const [summary, setSummary] = useState({
    total_analyzed: 0,
    fake: 0,
    real: 0,
    suspicious: 0,
  });

  const loadSummary = async () => {
    try {
      const data = await fetchSummary();
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

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
    </div>
  );
}

export default Reports;