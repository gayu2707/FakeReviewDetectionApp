import { useEffect, useMemo, useState } from "react";
import { fetchHistory } from "../services/api";

function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [resultFilter, setResultFilter] = useState("ALL");

  useEffect(() => {
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

    loadHistory();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.method?.toLowerCase().includes(search.toLowerCase()) ||
        item.result?.toLowerCase().includes(search.toLowerCase()) ||
        item.text?.toLowerCase().includes(search.toLowerCase());

      const matchesMethod =
        methodFilter === "ALL" || item.method === methodFilter;

      const matchesResult =
        resultFilter === "ALL" || String(item.result).includes(resultFilter);

      return matchesSearch && matchesMethod && matchesResult;
    });
  }, [items, search, methodFilter, resultFilter]);

  return (
    <div className="page">
      <h1 className="page-title">History</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by method, result, or review text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <select
          className="filter-select"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="ALL">All Methods</option>
          <option value="VADER">VADER</option>
          <option value="SHAP">SHAP</option>
          <option value="HYBRID">HYBRID</option>
          <option value="COMPARE">COMPARE</option>
        </select>

        <select
          className="filter-select"
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
        >
          <option value="ALL">All Results</option>
          <option value="FAKE">FAKE</option>
          <option value="REAL">REAL</option>
          <option value="SUSPICIOUS">SUSPICIOUS</option>
        </select>
      </div>

      <div className="table-card">
        {loading ? (
          <p className="muted-text">Loading history...</p>
        ) : filteredItems.length === 0 ? (
          <p className="muted-text">No matching records found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Result</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.method}</td>
                  <td>{item.result}</td>
                  <td>{item.confidence}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="history-text-cell">
                    {item.text?.length > 70
                      ? item.text.slice(0, 70) + "..."
                      : item.text}
                  </td>
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