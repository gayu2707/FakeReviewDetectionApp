import { useParams } from "react-router-dom";
import { useState } from "react";
import ResultBox from "../components/ResultBox";
import { analyzeMethod } from "../services/api";

function Method() {
  const { name } = useParams();
  const methodName = (name || "vader").toLowerCase();

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const titleMap = {
    vader: "VADER Analysis",
    shap: "SHAP Analysis",
    hybrid: "HYBRID Analysis",
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter review text");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await analyzeMethod(methodName, text);
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">{titleMap[methodName] || "Method Analysis"}</h1>

      <textarea
        className="review-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter review text..."
      />

      <button className="primary-btn" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {result && (
        <ResultBox
          method={result.method}
          result={result.result}
          confidence={result.confidence}
          certainty={result.certainty}
          indicators={result.indicators}
        />
      )}
    </div>
  );
}

export default Method;