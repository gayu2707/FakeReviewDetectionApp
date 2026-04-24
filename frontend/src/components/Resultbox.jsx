function ResultBox({ method, result, confidence, certainty, indicators = [] }) {
  const isDanger = result === "FAKE";
  const isNeutral = result === "SUSPICIOUS";

  let themeClass = "result-success";
  if (isDanger) themeClass = "result-danger";
  if (isNeutral) themeClass = "result-neutral";

  return (
    <div className={`result-box ${themeClass}`}>
      <div className="result-box-header">
        <div className="result-left">
          <div className="result-icon">
            {isDanger ? "⚠️" : "✅"}
          </div>

          <div>
            <h2 className="result-title">{result}</h2>
            <p className="result-subtitle">{method} Method</p>
            <p className="result-certainty">Certainty: {certainty}</p>
          </div>
        </div>

        <div className="result-score-wrap">
          <div className="result-score">{confidence}%</div>
          <div className="result-score-label">Confidence</div>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className={`progress-fill ${themeClass}`}
          style={{ width: `${confidence}%` }}
        />
      </div>

      <div className="progress-labels">
        <span>Low Risk</span>
        <span>Fake Detection Threshold (&gt;60%)</span>
        <span>High Risk</span>
      </div>

      <div className="indicator-card">
        <h4>🔍 Indicators Detected:</h4>
        {indicators.length ? (
          <ul>
            {indicators.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No indicators detected</p>
        )}
      </div>
    </div>
  );
}

export default ResultBox;