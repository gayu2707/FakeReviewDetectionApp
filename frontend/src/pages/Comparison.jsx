import { useState } from "react";
import { compareModels } from "../services/api";

function Comparison() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (!text.trim()) {
      setError("Please enter review text");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await compareModels(text);
      setResult(data.results);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const results = result
    ? [
        {
          name: "VADER",
          score: result.vader.confidence,
          label: result.vader.result,
          sub: "Sentiment Lexicon",
          icon: "📊",
          type:
            result.vader.result === "FAKE"
              ? "danger"
              : result.vader.result === "SUSPICIOUS"
              ? "neutral"
              : "success",
        },
        {
          name: "HYBRID",
          score: result.hybrid.confidence,
          label: result.hybrid.result,
          sub: "ML Ensemble",
          icon: "🤖",
          type:
            result.hybrid.result === "FAKE"
              ? "danger"
              : result.hybrid.result === "SUSPICIOUS"
              ? "neutral"
              : "success",
        },
        {
          name: "SHAP",
          score: result.shap.confidence,
          label: result.shap.result,
          sub: "Pattern Match",
          icon: "🔎",
          type:
            result.shap.result === "FAKE"
              ? "danger"
              : result.shap.result === "SUSPICIOUS"
              ? "neutral"
              : "success",
        },
      ]
    : [];

  return (
    <div className="page">
      <h1 className="page-title">Compare Models</h1>

      <textarea
        className="review-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter review text..."
      />

      <button className="primary-btn" onClick={handleCompare} disabled={loading}>
        {loading ? "Comparing..." : "Compare All Models"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {results.length > 0 && (
        <>
          <div className="chart-card">
            <div className="chart-grid-lines">
              {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map((val) => (
                <div key={val} className="chart-row">
                  <span>{val}%</span>
                  <div className="chart-line"></div>
                </div>
              ))}
            </div>

            <div className="bar-wrapper">
              {results.map((item) => (
                <div className="bar-group" key={item.name}>
                  <div className="bar-bg">
                    <div
                      className={`bar-fill bar-${item.name.toLowerCase()}`}
                      style={{ height: `${item.score}%` }}
                    />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="compare-card-grid">
            {results.map((item) => (
              <div className="compare-result-card" key={item.name}>
                <h2>
                  {item.icon} {item.name}
                </h2>
                <p className="compare-sub">{item.sub}</p>

                <div className={`pill pill-${item.type}`}>{item.label}</div>

                <div className="mini-progress">
                  <div
                    className={`mini-progress-fill mini-${item.type}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <div className="compare-score">{item.score}%</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Comparison;