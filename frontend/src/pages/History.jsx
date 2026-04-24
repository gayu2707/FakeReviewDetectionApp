import { useEffect, useState } from "react";
import { fetchHistory } from "../services/api";

function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setItems(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">History</h1>

      <div className="table-card">
        {loading ? (
          <p className="muted-text">Loading history...</p>
        ) : items.length === 0 ? (
          <p className="muted-text">No history found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Result</th>
                <th>Confidence</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.method}</td>
                  <td>{item.result}</td>
                  <td>{item.confidence}</td>
                  <td>{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default History;